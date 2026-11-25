import { memo } from 'react'
import { GenreBadge } from './GenreBadge'
import { useNavigate } from 'react-router-dom'

// Carte de livre affichée dans le catalogue
// Reçoit ses données via props
function BookCardInner({ livre, onPret }) {
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
          Voir
        </button>
        {livre.disponible ? (
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => navigate(`/livres/${livre.id}/preter`)}
          >
            Preter
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-success btn-sm"
            onClick={() => onPret && onPret(livre.id)}
          >
            Rendre
          </button>
        )}
      </div>
    </div>
  )
}

// Utilisation de memo pour eviter les re-renders inutiles
export const BookCard = memo(BookCardInner)