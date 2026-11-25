import { useReducer, useEffect } from 'react'
import { libraryReducer, initialState } from '../reducers/libraryReducer'
import { LibraryContext } from './LibraryContext'

// Clé localStorage
const STORAGE_KEY = 'biblioapp_livres'

// Données d'exemple (en dehors du composant pour éviter re-création)
const LIVRES_EXEMPLE = [
  {
    id: '1',
    titre: 'Le Petit Prince',
    auteur: 'Antoine de Saint-Exupéry',
    genre: 'Roman',
    annee: 1943,
    disponible: true,
    prets: []
  },
  {
    id: '2',
    titre: '1984',
    auteur: 'George Orwell',
    genre: 'Science-fiction',
    annee: 1949,
    disponible: false,
    prets: [
      {
        eleve: 'Marie Dupont',
        dateSortie: '2025-01-10',
        dateRetourPrevue: '2025-01-24',
        rendu: false
      }
    ]
  },
  {
    id: '3',
    titre: 'Les Misérables',
    auteur: 'Victor Hugo',
    genre: 'Roman',
    annee: 1862,
    disponible: true,
    prets: []
  },
  {
    id: '4',
    titre: 'Harry Potter à l\'école des sorciers',
    auteur: 'J.K. Rowling',
    genre: 'Fantasy',
    annee: 1997,
    disponible: true,
    prets: []
  },
  {
    id: '5',
    titre: 'Le Seigneur des Anneaux',
    auteur: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    annee: 1954,
    disponible: false,
    prets: [
      {
        eleve: 'Paul Martin',
        dateSortie: '2025-01-05',
        dateRetourPrevue: '2025-01-19',
        rendu: false
      }
    ]
  }
]

// Provider pour la bibliothèque (séparé du Context pour Fast Refresh)
export function LibraryProvider({ children }) {
  const [state, dispatch] = useReducer(libraryReducer, initialState)

  // Chargement depuis localStorage au montage
  useEffect(() => {
    try {
      const data = localStorage.getItem(STORAGE_KEY)
      if (data) {
        const parsed = JSON.parse(data)
        // Vérifier que c'est un tableau valide
        if (Array.isArray(parsed)) {
          dispatch({ type: 'CHARGER', payload: parsed })
        } else {
          // Données invalides, charger les exemples
          dispatch({ type: 'CHARGER', payload: LIVRES_EXEMPLE })
        }
      } else {
        // Pas de données, charger les exemples
        dispatch({ type: 'CHARGER', payload: LIVRES_EXEMPLE })
      }
    } catch (e) {
      // JSON invalide, charger les exemples
      console.warn('Erreur lecture localStorage:', e)
      dispatch({ type: 'CHARGER', payload: LIVRES_EXEMPLE })
    }
  }, [])

  // Sauvegarde dans localStorage à chaque changement (sauf au chargement initial)
  useEffect(() => {
    if (state.isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.livres))
    }
  }, [state.livres, state.isLoaded])

  // Actions exposées via le contexte
  const ajouterLivre = (livre) => dispatch({ type: 'AJOUTER_LIVRE', payload: livre })
  const supprimerLivre = (id) => dispatch({ type: 'SUPPRIMER_LIVRE', payload: id })
  const preterLivre = (id, eleve, dateSortie, dateRetourPrevue) =>
    dispatch({ type: 'PRETER', payload: { id, eleve, dateSortie, dateRetourPrevue } })
  const rendreLivre = (id) => dispatch({ type: 'RENDRE', payload: id })

  const value = {
    livres: state.livres,
    isLoaded: state.isLoaded,
    ajouterLivre,
    supprimerLivre,
    preterLivre,
    rendreLivre
  }

  return (
    <LibraryContext.Provider value={value}>
      {children}
    </LibraryContext.Provider>
  )
}