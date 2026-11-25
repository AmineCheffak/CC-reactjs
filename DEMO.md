# Démonstration BiblioApp

## Lancement de l'application

```bash
npm run dev
```

L'application démarre sur `http://localhost:5173`

## Scénario de démonstration

### 1. Tableau de bord

![Dashboard](screenshot-dashboard)

Le tableau de bord affiche :
- Nombre total de livres
- Livres empruntés / disponibles
- Nombre de prêts en retard
- Genre le plus emprunté

### 2. Catalogue des livres

![Catalogue](screenshot-catalogue)

Fonctionnalités :
- 🔍 Recherche par titre ou auteur
- 🎯 Filtre par genre
- 📊 Filtre par disponibilité
- ➕ Ajout d'un nouveau livre
- 📥 Export JSON du catalogue

### 3. Détails d'un livre

![Fiche Livre](screenshot-fiche)

- Affichage des informations du livre
- Historique des prêts avec statut
- Prêts en retard affichés en rouge
- Boutons Retour et Supprimer

### 4. Emprunter un livre

![Pret](screenshot-pret)

Formulaire avec validation :
- Nom de l'élève : obligatoire
- Date de retour : doit être dans le futur

### 5. Thème sombre/clair

Cliquez sur l'icône lune/soleil dans la navbar pour basculer entre les thèmes.

## Données de test

L'application initialise avec :
- 5 livres dans différents genres (Roman, SF, Fantasy, Policier, Biographie)
- 2 livres empruntés en cours

## Export de données

Depuis le catalogue, cliquez sur "Exporter JSON" pour télécharger `catalogue.json` contenant toute la bibliothèque.

## Technologies utilisées

- React 18
- React Router v6
- React Hook Form
- CSS Pur (pas de framework UI)
- localStorage pour la persistance