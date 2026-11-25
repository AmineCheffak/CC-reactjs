// Reducer pour la gestion de la bibliothèque
// Actions : AJOUTER_LIVRE, SUPPRIMER_LIVRE, PRETER, RENDRE, CHARGER

export const initialState = {
  livres: [],
  isLoaded: false
}

export function libraryReducer(state, action) {
  switch (action.type) {
    case 'CHARGER': {
      // Remplace l'état par les données chargées depuis localStorage
      return {
        ...state,
        livres: action.payload || [],
        isLoaded: true
      }
    }
    case 'AJOUTER_LIVRE': {
      // Ajoute un nouveau livre (immutabilité)
      return {
        ...state,
        livres: [...state.livres, action.payload]
      }
    }
    case 'SUPPRIMER_LIVRE': {
      // Supprime un livre par son id
      return {
        ...state,
        livres: state.livres.filter(livre => String(livre.id) !== String(action.payload))
      }
    }
    case 'PRETER': {
      // Prête un livre à un élève
      return {
        ...state,
        livres: state.livres.map(livre => {
          if (String(livre.id) === String(action.payload.id)) {
            return {
              ...livre,
              disponible: false,
              prets: [
                ...livre.prets,
                {
                  eleve: action.payload.eleve,
                  dateSortie: action.payload.dateSortie,
                  dateRetourPrevue: action.payload.dateRetourPrevue,
                  rendu: false
                }
              ]
            }
          }
          return livre
        })
      }
    }
    case 'RENDRE': {
      // Rend un livre (marque le dernier prêt comme rendu)
      return {
        ...state,
        livres: state.livres.map(livre => {
          if (String(livre.id) === String(action.payload)) {
            const prets = [...livre.prets]
            // Trouver le dernier prêt non rendu
            const dernierIndex = prets.findLastIndex(p => !p.rendu)
            if (dernierIndex !== -1) {
              prets[dernierIndex] = { ...prets[dernierIndex], rendu: true }
            }
            return {
              ...livre,
              disponible: true,
              prets
            }
          }
          return livre
        })
      }
    }
    default:
      throw new Error(`Action inconnue : ${action.type}`)
  }
}