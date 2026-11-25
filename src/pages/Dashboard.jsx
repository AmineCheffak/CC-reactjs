import { useMemo } from 'react'
import { useLibrary } from '../hooks/useLibrary'
import { StatCard } from '../components/StatCard'
import { BookOpen, TrendingUp } from 'lucide-react'

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
            genreCounts[livre.genre] =
                (genreCounts[livre.genre] || 0) + livre.prets.length
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
        <div className="min-h-screen bg-white dark:bg-black/90 sm:p-6 lg:p-8 transition-colors duration-300">


            <div className="mb-8 m-5">

                <h1 className="text-2xl sm:text-3xl text-black dark:text-white">
                    Tableau de bord
                </h1>

                <p className="mt-2 text-gray-500 dark:text-gray-400">
                    Bienvenue dans votre espace de gestion de bibliothèque.
                </p>

            </div>


            <div className="flex flex-wrap gap-5">

                <div className="flex-1 min-w-[220px]">
                    <StatCard
                        titre="Livres totaux"
                        valeur={stats.totalLivres}
                        couleur="total"
                    />
                </div>

                <div className="flex-1 min-w-[220px]">
                    <StatCard
                        titre="Empruntés"
                        valeur={stats.livresEmpruntes}
                        couleur="pret"
                    />
                </div>

                <div className="flex-1 min-w-[220px]">
                    <StatCard
                        titre="Disponibles"
                        valeur={stats.livresDisponibles}
                        couleur="disponible"
                    />
                </div>

                <div className="flex-1 min-w-[220px]">
                    <StatCard
                        titre="En retard"
                        valeur={stats.pretsEnRetard}
                        couleur="retard"
                    />
                </div>

            </div>


            <div className="mt-8 bg-white dark:bg-white/10 border border-gray-200 dark:border-0 rounded-2xl p-6 shadow-sm transition-colors duration-300">

                <div className="flex items-center gap-4 mb-6">

                    <div className="p-3 rounded-xl bg-white dark:bg-white/10">

                        <TrendingUp
                            size={24}
                            className="text-black dark:text-white"
                        />

                    </div>

                    <div>

                        <h2 className="text-lg text-black dark:text-white">
                            Genre le plus emprunté
                        </h2>

                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Le genre préféré des lecteurs
                        </p>

                    </div>

                </div>

                <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-white/10 border border-gray-100 dark:border-gray-800">

                    <BookOpen
                        size={22}
                        className="text-black dark:text-white"
                    />

                    <span className="text-lg text-black dark:text-white">
                        {stats.genrePopulaire}
                    </span>

                </div>

            </div>

        </div>
    )
}
