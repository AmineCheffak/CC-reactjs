# BiblioApp - Application de Gestion de Bibliothèque

Application React de gestion de bibliothèque avec persistance localStorage.

## Fonctionnalités

- **Catalogue de livres** : Affichage, recherche et filtres par genre et disponibilité
- **Gestion des prêts** : Emprunter et rendre des livres avec validation des dates
- **Statistiques** : Tableau de bord avec statistiques en temps réel
- **Thème sombre/clair** : Toggle thème avec sauvegarde dans localStorage
- **Persistence** : Toutes les données sont sauvegardées dans localStorage

## Technologies

- **React 18** avec Router v6
- **React Hook Form** pour la validation des formulaires
- **React Context** pour la gestion d'état globale
- **CSS Pur** sans dépendance UI externe

## Installation

```bash
npm install
npm run dev
```

## Structure du projet

```
src/
├── App.jsx                    # Routeur principal
├── App.css                    # Styles principaux
├── context/
│   ├── LibraryContext.jsx     # Context null
│   ├── LibraryContextProvider.jsx  # Provider avec persistance
│   ├── ThemeContext.jsx       # Theme context
│   └── ThemeContextProvider.jsx    # Theme toggle
├── hooks/
│   ├── useLibrary.js          # Hook contexte bibliothèque
│   ├── useTheme.js            # Hook contexte thème
│   └── useBookActions.js      # Callbacks memoisés
├── components/
│   ├── Navbar.jsx             # Navigation principale
│   ├── BookCard.jsx           # Carte livre
│   └── GenreBadge.jsx         # Badge genre
└── pages/
    ├── Dashboard.jsx          # Tableau de bord stats
    ├── Catalogue.jsx          # Catalogue avec recherche
    ├── AjoutLivre.jsx         # Formulaire ajout livre
    ├── Pret.jsx               # Formulaire prêt
    ├── FicheLivre.jsx         # Détails livre
    └── PageIntrouvable.jsx    # 404
```

## Hooks React implémentés

- `useState` : Gestion état formulaires et filtres
- `useReducer` : Actions sur les livres (ajouter, préter, rendre, supprimer)
- `useContext` : Accès aux contextes
- `useEffect` : Auto-focus et persistance
- `useRef` : Références DOM pour focus
- `useMemo` : Statistiques et filtres mémoisés
- `useCallback` : Callbacks stabiles pour actions

## Commands

```bash
npm run dev     # Démarrage en développement
npm run build   # Build production
npm run lint    # Linting ESLint
npm run preview # Preview du build
```

## Authors

Claude Code & Amine Cheffak