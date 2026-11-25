import { memo } from 'react'
import { GenreBadge } from './GenreBadge'
import { useNavigate } from 'react-router-dom'
import { Eye, Send, RotateCcw, Trash2 } from 'lucide-react'

function BookCardInner({ livre, onPret, onDelete }) {
  const navigate = useNavigate()

  return (
    <div className="flex h-full flex-col justify-between gap-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900">

      {/* Informations du livre */}
      <div>
        <h3 className="mb-2 line-clamp-2 text-lg font-bold text-gray-900 dark:text-white">
          {livre.titre}
        </h3>

        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
          Par {livre.auteur}
        </p>

        <div className="">
          <GenreBadge genre={livre.genre} />
        </div>
      </div>

      {/* Disponibilité */}
      <div>
        <span
          className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold`}
        >
          {livre.disponible ? 'Disponible' : 'Emprunté'}
        </span>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2 border-t border-gray-100 pt-4 dark:border-neutral-800">

        <button
          type="button"
          onClick={() => navigate(`/livres/${livre.id}`)}
          className="inline-flex flex-1 items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-gray-200 dark:hover:bg-neutral-700"
        >
          <Eye size={16} className="mr-2" />
          Voir
        </button>

        {livre.disponible ? (
          <button
            type="button"
            onClick={() => navigate(`/livres/${livre.id}/preter`)}
            className="inline-flex flex-1 items-center justify-center rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
          >
            <Send size={16} className="mr-2" />
            Prêter
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onPret && onPret(livre.id)}
            className="inline-flex flex-1 items-center justify-center rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-gray-200 dark:hover:bg-neutral-700"
          >
            <RotateCcw size={16} className="mr-2" />
            Rendre
          </button>
        )}

        <button
          type="button"
          onClick={() => onDelete && onDelete(livre.id)}
          className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-black dark:border-neutral-700 dark:bg-neutral-900 dark:text-gray-300 dark:hover:bg-neutral-800 dark:hover:text-white"
          title="Supprimer"
          aria-label={`Supprimer ${livre.titre}`}
        >
          <Trash2 size={16} />
        </button>

      </div>
    </div>
  )
}

export const BookCard = memo(BookCardInner)
