import { memo } from 'react'
import { GenreBadge } from './GenreBadge'
import { useNavigate } from 'react-router-dom'
import { Eye, Send, RotateCcw, Trash2 } from 'lucide-react'

function BookCardInner({ livre, onPret, onDelete }) {
  const navigate = useNavigate()

  return (
    <div className="book-card">
      <div>
        <h3 className="book-titre">{livre.titre}</h3>
        <p className="book-auteur">par {livre.auteur}</p>
        <div className="book-genre">
          <GenreBadge genre={livre.genre} />
        </div>
      </div>
      <div className="book-disponible">
        {livre.disponible ? 'Disponible' : 'Emprunté'}
      </div>
      <div className="book-actions">
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => navigate(`/livres/${livre.id}`)}
        >
          <Eye size={18} className="mr-2" />
          <span>Voir</span>
        </button>
        {livre.disponible ? (
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => navigate(`/livres/${livre.id}/preter`)}
          >
            <Send size={18} className="mr-2" />
            <span>Prêter</span>
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-success btn-sm"
            onClick={() => onPret && onPret(livre.id)}
          >
            <RotateCcw size={18} className="mr-2" />
            <span>Rendre</span>
          </button>
        )}
        <button
          type="button"
          className="btn btn-danger btn-sm"
          onClick={() => onDelete && onDelete(livre.id)}
        >
          <Trash2 size={18} className="mr-2" />
          <span>Supprimer</span>
        </button>
      </div>
    </div>
  )
}

export const BookCard = memo(BookCardInner)