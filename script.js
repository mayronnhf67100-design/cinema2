/* ===== Maflix — Suivi de films & séries ===== */

const KEY = 'maflix_data_v1';
let items = load();
let currentFilter = 'all';
let editingId = null;

/* ---- Storage ---- */
function load(){
  try{ return JSON.parse(localStorage.getItem(KEY)) || []; }
  catch(e){ return []; }
}
function save(){
  localStorage.setItem(KEY, JSON.stringify(items));
}
function uid(){ return Date.now().toString(36) + Math.random().toString(36).slice(2,7); }

/* ---- DOM ---- */
const $ = id => document.getElementById(id);
const grid = $('grid');
const empty = $('empty');
const search = $('search');
const continueSection = $('continueSection');
const continueRow = $('continueRow');
const modal = $('modal');
const progressBlock = $('progressBlock');

/* ---- Helpers ---- */
const STATUS_LABEL = { towatch:'À regarder', watching:'En cours', done:'Terminé' };
const TYPE_LABEL = { movie:'Film', series:'Série' };

function pad(n){ return String(n).padStart(2,'0'); }

function progressText(it){
  if(it.type === 'series'){
    const s = it.season || 0, e = it.episode || 0;
    return `S${pad(s)}E${pad(e)} — ${pad(it.min||0)}:${pad(it.sec||0)}`;
  }
  return `${pad(it.min||0)}:${pad(it.sec||0)}`;
}

function hasProgress(it){
  return it.status === 'watching' &&
    ((it.min||0)>0 || (it.sec||0)>0 || (it.season||0)>0 || (it.episode||0)>0);
}

/* ---- Render ---- */
function render(){
  const q = search.value.trim().toLowerCase();

  // Continue à regarder
  const watching = items.filter(hasProgress);
  if(watching.length){
    continueSection.classList.remove('hidden');
    continueRow.innerHTML = watching.map(it => `
      <div class="continue-card" data-id="${it.id}">
        <div class="cc-title">${escapeHtml(it.title)}</div>
        <div class="cc-prog">Continuer : ${progressText(it)}</div>
        <div class="cc-bar"><span></span></div>
      </div>`).join('');
  } else {
    continueSection.classList.add('hidden');
  }

  // Liste filtrée
  let list = items.filter(it => {
    if(currentFilter === 'movie') return it.type === 'movie';
    if(currentFilter === 'series') return it.type === 'series';
    if(currentFilter === 'favorite') return it.favorite;
    if(['towatch','watching','done'].includes(currentFilter)) return it.status === currentFilter;
    return true;
  });

  if(q) list = list.filter(it => it.title.toLowerCase().includes(q));

  list.sort((a,b)=> (b.created||0)-(a.created||0));

  if(!list.length){
    grid.innerHTML = '';
    empty.classList.remove('hidden');
  } else {
    empty.classList.add('hidden');
    grid.innerHTML = list.map(cardHtml).join('');
  }
}

function cardHtml(it){
  const poster = it.poster
    ? `<img src="${escapeHtml(it.poster)}" alt="" onerror="this.parentNode.innerHTML='<span class=\\'ph\\'>🎬</span>'">`
    : `<span class="ph">${it.type==='series'?'📺':'🎬'}</span>`;
  const rating = (it.rating!==''&&it.rating!=null&&!isNaN(it.rating))
    ? `<span class="rating">★ ${it.rating}</span>` : '';
  return `
    <div class="card" data-id="${it.id}">
      <div class="poster">
        ${poster}
        <span class="badge-type">${TYPE_LABEL[it.type]}</span>
        ${it.favorite?'<span class="fav-mark">⭐</span>':''}
      </div>
      <div class="card-info">
        <div class="card-title">${escapeHtml(it.title)}</div>
        <div class="card-meta">
          ${rating}
          <span class="status-dot">${STATUS_LABEL[it.status]}</span>
        </div>
      </div>
    </div>`;
}

function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, c => (
    {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]
  ));
}

/* ---- Modal ---- */
function openModal(id){
  editingId = id || null;
  const isEdit = !!id;
  $('modalTitle').textContent = isEdit ? 'Modifier' : 'Ajouter';
  $('deleteBtn').classList.toggle('hidden', !isEdit);

  const it = isEdit ? items.find(x=>x.id===id) : {};
  $('f-title').value = it.title || '';
  $('f-type').value = it.type || 'movie';
  $('f-status').value = it.status || 'towatch';
  $('f-poster').value = it.poster || '';
  $('f-rating').value = (it.rating!=null?it.rating:'');
  $('f-comment').value = it.comment || '';
  $('f-favorite').checked = !!it.favorite;
  $('f-season').value = it.season || '';
  $('f-episode').value = it.episode || '';
  $('f-min').value = it.min || '';
  $('f-sec').value = it.sec || '';

  toggleProgressBlock();
  modal.classList.remove('hidden');
  setTimeout(()=>$('f-title').focus(),100);
}

function closeModal(){
  modal.classList.add('hidden');
  editingId = null;
}

function toggleProgressBlock(){
  // Affiche le marque-page seulement pour les séries (saison/épisode) ou si "en cours"
  const isSeries = $('f-type').value === 'series';
  const isWatching = $('f-status').value === 'watching';
  progressBlock.classList.toggle('hidden', !(isSeries || isWatching));
  // Pour un film, cacher saison/épisode
  const seriesFields = [$('f-season').closest('label'), $('f-episode').closest('label')];
  seriesFields.forEach(l => l.style.display = isSeries ? '' : 'none');
}

function saveItem(){
  const title = $('f-title').value.trim();
  if(!title){ $('f-title').focus(); return; }

  const ratingRaw = $('f-rating').value;
  const data = {
    title,
    type: $('f-type').value,
    status: $('f-status').value,
    poster: $('f-poster').value.trim(),
    rating: ratingRaw === '' ? null : Math.min(10, Math.max(0, parseFloat(ratingRaw))),
    comment: $('f-comment').value.trim(),
    favorite: $('f-favorite').checked,
    season: parseInt($('f-season').value)||0,
    episode: parseInt($('f-episode').value)||0,
    min: parseInt($('f-min').value)||0,
    sec: Math.min(59, parseInt($('f-sec').value)||0),
  };

  if(editingId){
    const i = items.findIndex(x=>x.id===editingId);
    items[i] = {...items[i], ...data};
  } else {
    items.push({ id:uid(), created:Date.now(), ...data });
  }
  save();
  render();
  closeModal();
}

function deleteItem(){
  if(!editingId) return;
  if(confirm('Supprimer ce contenu ?')){
    items = items.filter(x=>x.id!==editingId);
    save();
    render();
    closeModal();
  }
}

/* ---- Events ---- */
$('addBtn').addEventListener('click', ()=>openModal());
$('closeModal').addEventListener('click', closeModal);
$('saveBtn').addEventListener('click', saveItem);
$('deleteBtn').addEventListener('click', deleteItem);
$('f-type').addEventListener('change', toggleProgressBlock);
$('f-status').addEventListener('change', toggleProgressBlock);

modal.addEventListener('click', e=>{ if(e.target===modal) closeModal(); });

search.addEventListener('input', render);

$('filters').addEventListener('click', e=>{
  const chip = e.target.closest('.chip');
  if(!chip) return;
  document.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));
  chip.classList.add('active');
  currentFilter = chip.dataset.filter;
  render();
});

document.addEventListener('click', e=>{
  const card = e.target.closest('.card, .continue-card');
  if(card && card.dataset.id) openModal(card.dataset.id);
});

document.addEventListener('keydown', e=>{
  if(e.key==='Escape' && !modal.classList.contains('hidden')) closeModal();
});

/* ---- Init ---- */
render();

/* ---- Service worker ---- */
if('serviceWorker' in navigator){
  window.addEventListener('load', ()=>{
    navigator.serviceWorker.register('service-worker.js').catch(()=>{});
  });
}
