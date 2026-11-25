import { useParams, useNavigate, Link } from 'react-router-dom'
import { useLibrary } from '../hooks/useLibrary'
import { useBookActions } from '../hooks/useBookActions'
import { useMemo } from 'react'
import { GenreBadge } from '../components/GenreBadge'
import {
  Calendar,
  User,
  Book,
  RefreshCw,
  Trash2,
  AlertCircle,
  Send
} from 'lucide-react'

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

    return livre.prets.filter(
      p => !p.rendu && new Date(p.dateRetourPrevue) < aujourdhui
    )
  }, [livre])

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-neutral-950">
        <p className="text-gray-600 dark:text-gray-400">
          Chargement...
        </p>
      </div>
    )
  }

  if (!livre) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center dark:bg-neutral-950">

        <Book size={48} className="mb-4 text-gray-400 dark:text-gray-500" />

        <h1 className="text-2xl text-gray-900 dark:text-white">
          Livre introuvable
        </h1>

        <p className="mb-6 mt-2 text-sm text-gray-500 dark:text-gray-400">
          Le livre demandé n'existe pas.
        </p>

        <Link
          to="/"
          className="inline-flex items-center rounded-lg bg-gray-900 px-5 py-3 text-sm text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
        >
          <Book size={18} className="mr-2" />
          Retour à l'accueil
        </Link>

      </div>
    )
  }

  const handleRendre = () => {
    handleRetour(livre.id)

    navigate(`/livres/${id}`, {
      state: {
        message: 'Livre rendu avec succes',
        type: 'success'
      }
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

  const cardClass =
    "rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"

  const labelClass =
    "text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400"

  const valueClass =
    "mt-2 text-base text-gray-900 dark:text-white"

  return (
    <div className="min-h-screen bg-gray-50 p-5 text-gray-900 transition-colors duration-300 dark:bg-neutral-950 dark:text-white sm:p-8 lg:p-10">

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">

        <div>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            Bibliothèque / Catalogue / Détails
          </p>

          <h1 className="text-3xl tracking-tight sm:text-4xl">
            {livre.titre}
          </h1>
        </div>

        <Link
          to="/livres"
          className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 transition hover:bg-gray-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-gray-200 dark:hover:bg-neutral-800"
        >
          <Book size={18} className="mr-2" />
          Retour
        </Link>

      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

        <div className={cardClass}>
          <div className="mb-3 flex items-center gap-3">
            <User size={20} className="text-gray-700 dark:text-gray-300" />
            <span className={labelClass}>Auteur</span>
          </div>

          <p className={valueClass}>
            {livre.auteur}
          </p>
        </div>

        <div className={cardClass}>
          <div className="mb-3 flex items-center gap-3">
            <Book size={20} className="text-gray-700 dark:text-gray-300" />
            <span className={labelClass}>Genre</span>
          </div>

          <GenreBadge genre={livre.genre} />
        </div>

        <div className={cardClass}>
          <div className="mb-3 flex items-center gap-3">
            <Calendar size={20} className="text-gray-700 dark:text-gray-300" />
            <span className={labelClass}>Année de publication</span>
          </div>

          <p className={valueClass}>
            {livre.annee}
          </p>
        </div>

        <div className={cardClass}>
          <span className={labelClass}>Statut</span>

          <p className={valueClass}>
            {livre.disponible ? 'Disponible' : 'Emprunté'}
          </p>
        </div>

        <div className={cardClass}>
          <span className={labelClass}>Nombre de prêts</span>

          <p className={valueClass}>
            {livre.prets.length}
          </p>
        </div>

        <div className={cardClass}>
          <span className={labelClass}>Prêts en retard</span>

          <p className={valueClass}>
            {pretsEnRetard.length}
          </p>
        </div>

      </div>

      <section className="mb-8">

        <h2 className="mb-4 text-xl ">
          Actions
        </h2>

        <div className="flex flex-wrap gap-3">

          {livre.disponible ? (
            <Link
              to={`/livres/${livre.id}/preter`}
              className="inline-flex items-center rounded-lg bg-gray-900 px-5 py-3 text-sm text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
            >
              <Send size={18} className="mr-2" />
              Prêter le livre
            </Link>
          ) : (
            <button
              onClick={handleRendre}
              className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm text-gray-800 transition hover:bg-gray-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-gray-200 dark:hover:bg-neutral-800"
            >
              <RefreshCw size={18} className="mr-2" />
              Rendre le livre
            </button>
          )}

          <button
            onClick={handleSupprimerLivre}
            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm text-gray-800 transition hover:bg-gray-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-gray-200 dark:hover:bg-neutral-800"
          >
            <Trash2 size={18} className="mr-2" />
            Supprimer
          </button>

        </div>
      </section>

      <section>

        <div className="mb-4">
          <h2 className="text-xl">
            Historique des prêts
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Historique des emprunts de ce livre.
          </p>
        </div>

        {livre.prets.length === 0 ? (

          <div className={`${cardClass} py-12 text-center`}>
            <Book size={35} className="mx-auto mb-3 text-gray-400 dark:text-gray-500" />

            <p className=" text-gray-700 dark:text-gray-300">
              Aucun prêt enregistré
            </p>
          </div>

        ) : (

          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">

            <table className="w-full min-w-[650px] border-collapse text-left">

              <thead>
                <tr className="bg-gray-100 dark:bg-neutral-800">
                  <th className="px-5 py-4 text-xs uppercase tracking-wide text-gray-600 dark:text-gray-300">
                    Élève
                  </th>

                  <th className="px-5 py-4 text-xs uppercase tracking-wide text-gray-600 dark:text-gray-300">
                    Date de sortie
                  </th>

                  <th className="px-5 py-4 text-xs uppercase tracking-wide text-gray-600 dark:text-gray-300">
                    Date de retour prévue
                  </th>

                  <th className="px-5 py-4 text-xs uppercase tracking-wide text-gray-600 dark:text-gray-300">
                    Statut
                  </th>
                </tr>
              </thead>

              <tbody>
                {livre.prets.map((pret, index) => {
                  const enRetard = !pret.rendu && pretsEnRetard.includes(pret)

                  return (
                    <tr
                      key={index}
                      className="border-t border-gray-100 transition-colors hover:bg-gray-50 dark:border-neutral-800 dark:hover:bg-neutral-800/50"
                    >

                      <td className="px-5 py-4 text-sm text-gray-900 dark:text-white">
                        {pret.eleve}
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-300">
                        {formaterDate(pret.dateSortie)}
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-300">
                        {formaterDate(pret.dateRetourPrevue)}
                      </td>

                      <td className="px-5 py-4">

                        <span
                          className={`inline-flex rounded-full border px-3 py-1 text-xs ${
                            pret.rendu
                              ? 'border-gray-300 bg-gray-100 text-gray-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-gray-300'
                              : enRetard
                                ? 'border-gray-500 bg-gray-200 text-gray-900 dark:border-gray-500 dark:bg-neutral-700 dark:text-white'
                                : 'border-gray-300 bg-white text-gray-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-gray-300'
                          }`}
                        >
                          {pret.rendu
                            ? 'Rendu'
                            : enRetard
                              ? 'En retard'
                              : 'En cours'}
                        </span>

                      </td>

                    </tr>
                  )
                })}
              </tbody>

            </table>
          </div>
        )}

      </section>

      {pretsEnRetard.length > 0 && (

        <div className="mt-6 flex flex-wrap items-center gap-3 rounded-xl border border-gray-300 bg-gray-100 p-4 dark:border-neutral-700 dark:bg-neutral-900">

          <AlertCircle size={20} className="shrink-0 text-gray-800 dark:text-gray-200" />

          <div>
            <p className="text-gray-900 dark:text-white">
              Attention : prêts en retard
            </p>

            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {pretsEnRetard.length} prêt(s) en retard pour ce livre.
            </p>
          </div>

        </div>
      )}

    </div>
  )
}
