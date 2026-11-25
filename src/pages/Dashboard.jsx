import { useMemo } from 'react'
import { useLibrary } from '../hooks/useLibrary'

// Page du tableau de bord avec statistiques
export function Dashboard() {
  const { livres } = useLibrary()

  // Calculer les statistiques avec useMemo (toujours appelé)
  const stats = useMemo(() => {
    const totalLivres = livres.length
    const livresEmpruntes = livres.filter(l => !l.disponible).length
    const livresDisponibles = livres.filter(l => l.disponible).length

    // Compter les prêts en retard
    let pretsEnRetard = 0
    livres.forEach(livre => {
      livre.prets.forEach(pret => {
        if (!pret.rendu && new Date(pret.dateRetourPrevue) < new Date()) {
          pretsEnRetard++
        }
      })
    })

    // Trouver le genre le plus emprunté
    const genreCounts = {}
    livres.forEach(livre => {
      genreCounts[livre.genre] = (genreCounts[livre.genre] || 0) + livre.prets.length
    })
    const genrePopulaire = Object.keys(genreCounts).reduce((a, b) =>
      genreCounts[a] > genreCounts[b] ? a : b
    )

    return {
      totalLivres,
      livresEmpruntes,
      livresDisponibles,
      pretsEnRetard,
      genrePopulaire
    }
  }, [livres])

  return (
    <div className="page dashboard">
      <h1>Tableau de bord</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-number">{stats.totalLivres}</span>
          <span className="stat-label">Livres totaux</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{stats.livresEmpruntes}</span>
          <span className="stat-label">Empruntés</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{stats.livresDisponibles}</span>
          <span className="stat-label">Disponibles</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{stats.pretsEnRetard}</span>
          <span className="stat-label">En retard</span>
        </div>
      </div>

      <div className="stat-detail">
        <h2>Genre le plus emprunté</h2>
        <p>{stats.genrePopulaire}</p>
      </div>
    </div>
  )
}