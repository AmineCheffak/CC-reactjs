import { useCallback } from 'react'
import { useLibrary } from '../context/useLibrary'

// Hook pour obtenir les callbacks pour les actions sur un livre
export function useBookActions() {
  const { preterLivre, rendreLivre, supprimerLivre } = useLibrary()

  const handlePret = useCallback((id, eleve, dateRetourPrevue) => {
    const dateSortie = new Date().toISOString().split('T')[0]
    preterLivre(id, eleve, dateSortie, dateRetourPrevue)
  }, [preterLivre])

  const handleRetour = useCallback((id) => {
    rendreLivre(id)
  }, [rendreLivre])

  const handleSupprimer = useCallback((id) => {
    if (window.confirm("etes vous sur de vouloir supprimer ce livre ?")) {
      supprimerLivre(id)
    }
  }, [supprimerLivre])

  return { handlePret, handleRetour, handleSupprimer }
}