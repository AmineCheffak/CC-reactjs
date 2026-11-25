import { useParams, useNavigate, Link } from 'react-router-dom'
import { useLibrary } from '../hooks/useLibrary'
import { useBookActions } from '../hooks/useBookActions'
import { useMemo } from 'react'
import { GenreBadge } from '../components/GenreBadge'
import { Calendar, User, Book, RefreshCw, Trash2, AlertCircle } from 'lucide-react'

export function FicheLivre() {
  const { id } = useParams()
  const { livres, isLoaded } = useLibrary()
  const { handleRetour, handleSupprimer } = useBookActions()
  const navigate = useNavigate()

  const livre = useMemo(() => {
    return livres.find(l => String(l.id) === String(id))
  }, [livres, id])

  const pretsEnRetard = useMemo(() => {
    if (!livre) return []
    const aujourdhui = new Date()
    return livre.prets.filter(p => !p.rendu && new Date(p.dateRetourPrevue) < aujourdhui)
  }, [livre])

  if (!livre && isLoaded) {
    return (
      <div className="page flex flex-col items-center justify-center min-h-[400px]">
        <h1>Livre introuvable</h1>
        <p className="text-gray-600 dark:text-slate-400 mb-4">Le livre demandé n'existe pas.</p>
        <Link to="/" className="btn btn-primary">
          <Book size={18} className="mr-2" />
          <span>Retour à l'accueil</span>
        </Link>
      </div>
    )
  }

  const handleRendre = () => {
    handleRetour(livre.id)
    navigate(`/livres/${id}`, {
      state: { message: 'Livre rendu avec succes', type: 'success' }
    })
  }

  const handleSupprimerLivre = () => {
    handleSupprimer(livre.id)
    navigate('/livres')
  }

  const formaterDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR')
  }

  return (
    <div className="page fiche-livre">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h1>{livre.titre}</h1>
        <Link to="/livres" className="btn btn-secondary btn-sm">
          <Book size={18} className="mr-2" />
          <span>Retour</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-gray-200 dark:border-slate-700">
          <span className="text-xs text-gray-500 dark:text-slate-400 uppercase tracking-wide">Auteur</span>
          <p className="mt-1 text-sm font-medium text-gray-900 dark:text-slate-100">{livre.auteur}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-gray-200 dark:border-slate-700 sm:col-span-2 lg:col-span-1">
          <span className="text-xs text-gray-500 dark:text-slate-400 uppercase tracking-wide">Genre</span>
          <div className="mt-1">{<GenreBadge genre={livre.genre} />}</div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-gray-200 dark:border-slate-700">
          <span className="text-xs text-gray-500 dark:text-slate-400 uppercase tracking-wide">Année</span>
          <p className="mt-1 text-sm font-medium text-gray-900 dark:text-slate-100">{livre.annee}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-gray-200 dark:border-slate-700">
          <span className="text-xs text-gray-500 dark:text-slate-400 uppercase tracking-wide">Statut</span>
          <p className="mt-1 text-sm font-medium text-gray-900 dark:text-slate-100">{livre.disponible ? 'Disponible' : 'Emprunt'}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-gray-200 dark:border-slate-700 sm:col-span-2 lg:col-span-1">
          <span className="text-xs text-gray-500 dark:text-slate-400 uppercase tracking-wide">Nombre de prêts</span>
          <p className="mt-1 text-sm font-medium text-gray-900 dark:text-slate-100">{livre.prets.length}</p>
        </div>
      </div>

      <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-4">Actions</h2>
      <div className="flex flex-wrap gap-3 mb-8">
        {livre.disponible ? (
          <Link to={`/livres/${livre.id}/preter`} className="btn btn-primary">
            <Send size={18} className="mr-2" />
            <span>Pretner le livre</span>
          </Link>
        ) : (
          <button className="btn btn-success" onClick={handleRendre}>
            <RefreshCw size={18} className="mr-2" />
            <span>Rendre le livre</span>
          </button>
        )}
        <button className="btn btn-danger" onClick={handleSupprimerLivre}>
          <Trash2 size={18} className="mr-2" />
          <span>Supprimer</span>
        </button>
      </div>

      <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-4">Historique des prêts</h2>
      {livre.prets.length === 0 ? (
        <p className="text-gray-600 dark:text-slate-400">Aucun prêt</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg overflow-hidden bg-white dark:bg-slate-800 shadow-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-slate-700">
                <th className="p-3 text-left text-xs font-semibold text-gray-600 dark:text-slate-300 uppercase tracking-wide border-b border-gray-200 dark:border-slate-600">Eleve</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-600 dark:text-slate-300 uppercase tracking-wide border-b border-gray-200 dark:border-slate-600">Date de sortie</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-600 dark:text-slate-300 uppercase tracking-wide border-b border-gray-200 dark:border-slate-600">Date de retour prevue</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-600 dark:text-slate-300 uppercase tracking-wide border-b border-gray-200 dark:border-slate-600">Statut</th>
              </tr>
            </thead>
            <tbody>
              {livre.prets.map((pret, index) => {
                const enRetard = !pret.rendu && pretsEnRetard.includes(pret)
                return (
                  <tr key={index} className={enRetard ? 'bg-red-50 dark:bg-red-900/20' : ''}>
                    <td className="p-3 text-sm text-gray-900 dark:text-slate-100 border-b border-gray-100 dark:border-slate-700">{pret.eleve}</td>
                    <td className="p-3 text-sm text-gray-900 dark:text-slate-100 border-b border-gray-100 dark:border-slate-700">{formaterDate(pret.dateSortie)}</td>
                    <td className="p-3 text-sm text-gray-900 dark:text-slate-100 border-b border-gray-100 dark:border-slate-700">{formaterDate(pret.dateRetourPrevue)}</td>
                    <td className="p-3 text-sm font-medium text-gray-900 dark:text-slate-100 border-b border-gray-100 dark:border-slate-700">
                      {pret.rendu ? 'Renté' : (enRetard ? 'En retard' : 'En cours')}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {pretsEnRetard.length > 0 && (
        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2">
          <AlertCircle size={18} className="text-red-600 dark:text-red-400" />
          <strong className="text-red-800 dark:text-red-200">Attention :</strong>
          <span className="text-red-800 dark:text-red-200">{pretsEnRetard.length} pret(s) en retard pour ce livre.</span>
        </div>
      )}
    </div>
  )
}