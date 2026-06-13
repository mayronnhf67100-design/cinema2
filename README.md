# 🎬 Maflix — Mes films & séries

Application personnelle pour suivre tes **films** et **séries** : notes, commentaires, favoris, et reprise de lecture (« Continuer à regarder »).
100 % HTML / CSS / JavaScript. **Aucune installation, aucun terminal, aucun serveur.** Tout est sauvegardé dans ton navigateur.

---

## ✅ Mettre en ligne depuis ton téléphone (5 étapes)

1. **Crée un compte / connecte-toi** sur [github.com](https://github.com).
2. Crée un nouveau dépôt : bouton **+** en haut → **New repository**.
   - Nom au choix (ex. `maflix`)
   - Coche **Public**
   - Clique **Create repository**.
3. **Ajoute les fichiers** : dans le dépôt, **Add file → Upload files**.
   Téléverse **tous** ces fichiers en gardant la même structure :
   ```
   index.html
   style.css
   script.js
   manifest.json
   service-worker.js
   README.md
   icons/icon-192.png
   icons/icon-512.png
   ```
   > 💡 Le dossier `icons` doit être conservé. Sur l'upload GitHub, tu peux glisser le dossier `icons` entier, ou écrire `icons/icon-192.png` comme nom de fichier.
   Puis **Commit changes**.
4. Active **GitHub Pages** : onglet **Settings → Pages**.
   - **Source** : *Deploy from a branch*
   - **Branch** : `main` + dossier `/ (root)` → **Save**.
5. Attends ~1 minute, recharge la page **Settings → Pages**. Ton lien apparaît :
   ```
   https://TON-NOM.github.io/maflix/
   ```
   Ouvre-le. C'est prêt ! 🎉

---

## 📲 Installer comme une vraie application (PWA)

- **iPhone (Safari)** : ouvre le lien → bouton **Partager** → **Sur l'écran d'accueil**.
- **Android (Chrome)** : ouvre le lien → menu **⋮** → **Ajouter à l'écran d'accueil**.

L'app s'ouvre en plein écran et **fonctionne hors ligne**.

---

## 🧩 Fonctionnalités

- Ajouter, modifier, supprimer des films et séries.
- Recherche instantanée.
- Filtres : Films, Séries, Favoris, À regarder, En cours, Terminés.
- Note sur 10 + commentaire personnel + favori ⭐.
- **Continuer à regarder** avec marque-page précis, ex :
  `Continuer : Shameless — S02E01 — 23:40`
  (Mets le statut sur **En cours** et renseigne saison / épisode / minutes / secondes.)
- Sauvegarde automatique en **LocalStorage** : tes données restent après fermeture du navigateur.

---

## ⚠️ À savoir

Les données sont stockées **sur l'appareil et le navigateur** où tu utilises l'app.
Elles ne sont pas synchronisées entre plusieurs appareils. Vider les données du navigateur efface la liste.
