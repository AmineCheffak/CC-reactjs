
export const initialState = {
  livres: [],
  isLoaded: false
}

let nextId = 1000

function genererId() {
  return (nextId++).toString()
}

export function libraryReducer(state, action) {
  switch (action.type) {
    case 'CHARGER': {
      const maxId = state.livres.reduce((max, l) => {
        const idNum = parseInt(l.id)
        return idNum > max ? idNum : max
      }, 0)
      if (action.payload) {
        const maxFromPayload = action.payload.reduce((max, l) => {
          const idNum = parseInt(l.id)
          return idNum > max ? idNum : max
        }, 0)
        const globalMax = Math.max(maxId, maxFromPayload)
        nextId = globalMax + 1
      }
      return {
        ...state,
        livres: action.payload || [],
        isLoaded: true
      }
    }
    case 'AJOUTER_LIVRE': {
      const livre = {
        ...action.payload,
        id: action.payload.id || genererId()
      }
      return {
        ...state,
        livres: [...state.livres, livre]
      }
    }
    case 'SUPPRIMER_LIVRE': {
      return {
        ...state,
        livres: state.livres.filter(livre => String(livre.id) !== String(action.payload))
      }
    }
    case 'PRETER': {
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