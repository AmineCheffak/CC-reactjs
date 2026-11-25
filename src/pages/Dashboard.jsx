import { useMemo } from 'react'
import { useLibrary } from '../hooks/useLibrary'
import { StatCard } from '../components/StatCard'

export function Dashboard() {
  const { livres } = useLibrary()

  const stats = useMemo(() => {
    const totalLivres = livres.length
    const livresEmpruntes = livres.filter(l => !l.disponible).length
    const livresDisponibles = livres.filter(l => l.disponible).length

    let pretsEnRetard = 0
    livres.forEach(livre => {
      livre.prets.forEach(pret => {
        if (!pret.rendu && new Date(pret.dateRetourPrevue) < new Date()) {
          pretsEnRetard++
        }
      })
    })

    const genreCounts = {}
    livres.forEach(livre => {
      genreCounts[livre.genre] = (genreCounts[livre.genre] || 0) + livre.prets.length
    })
    const genrePopulaire = Object.keys(genreCounts).length > 0
      ? Object.keys(genreCounts).reduce((a, b) =>
          genreCounts[a] > genreCounts[b] ? a : b)
      : 'Aucun'

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
        <StatCard
          titre="Livres totaux"
          valeur={stats.totalLivres}
          couleur="total"
        />
        <StatCard
          titre="Empruntés"
          valeur={stats.livresEmpruntes}
          couleur="pret"
        />
        <StatCard
          titre="Disponibles"
          valeur={stats.livresDisponibles}
          couleur="disponible"
        />
        <StatCard
          titre="En retard"
          valeur={stats.pretsEnRetard}
          couleur="retard"
        />
      </div>

      <div className="mt-8 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-2">Genre le plus emprunté</h2>
        <p className="text-gray-700 dark:text-slate-300">{stats.genrePopulaire}</p>
      </div>
    </div>
  )
}