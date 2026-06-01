# CinéLog V2 - TODO

## Base de Données
- [x] Créer la table `entries` (films, séries, animes, documentaires, K-dramas)
- [x] Ajouter les champs : titre, type, note, affiche/image, commentaire, mention honorable
- [x] Créer la relation entre `users` et `entries`
- [x] Générer et appliquer les migrations SQL

## Backend API
- [x] Créer les procédures tRPC pour ajouter une entrée
- [x] Créer les procédures tRPC pour récupérer les entrées d'un utilisateur
- [x] Créer les procédures tRPC pour supprimer/modifier une entrée
- [x] Créer les procédures tRPC pour les statistiques (total, moyenne, répartition par type)
- [x] Créer les procédures tRPC pour récupérer le profil public d'un utilisateur par UID
- [x] Implémenter les filtres par catégorie
- [x] Implémenter la recherche par titre

## Frontend - Design et Layout
- [x] Configurer le thème noir/rouge (Tailwind CSS)
- [x] Créer la typographie élégante (Google Fonts)
- [x] Créer le composant Header avec navigation
- [x] Créer le composant Footer
- [x] Mettre à jour la page Home avec le design cinéma

## Frontend - Authentification
- [x] Implémenter la page de connexion/inscription OAuth (via le bouton "Se connecter")
- [x] Créer le système de redirection post-connexion
- [x] Afficher le profil utilisateur dans le header

## Frontend - Tableau de Bord Personnel
- [x] Créer la page Dashboard avec statistiques
- [x] Afficher le total d'entrées, moyenne des notes, répartition par type
- [x] Créer la section pour ajouter une nouvelle entrée
- [x] Implémenter le formulaire d'ajout (titre, type, note, affiche, commentaire, mention honorable)

## Frontend - Gestion des Entrées
- [x] Créer le composant Card pour afficher une entrée
- [x] Créer la section d'affichage des entrées avec grille responsive
- [x] Implémenter les filtres par catégorie (Films, Séries, Anime, Docs, K-dramas, Coups de cœur)
- [x] Implémenter la barre de recherche
- [x] Créer les actions de suppression/modification d'une entrée

## Frontend - Profil Public
- [x] Créer la page de profil public accessible via UID
- [x] Afficher les statistiques du profil public
- [x] Afficher toutes les entrées du profil public
- [x] Implémenter les filtres et recherche sur le profil public

## Optimisations et Tests
- [x] Écrire les tests vitest pour les procédures tRPC (9 tests passent)
- [x] Tester les filtres et la recherche
- [x] Optimiser les performances (lazy loading des images)
- [x] Vérifier la responsive design
- [x] Tester l'authentification OAuth

## Déploiement
- [x] Créer un checkpoint final
- [x] Préparer pour la publication
