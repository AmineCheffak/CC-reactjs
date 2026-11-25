import { useParams, useNavigate, Link } from 'react-router-dom'
import { useLibrary } from '../hooks/useLibrary'
import { useBookActions } from '../hooks/useBookActions'
import { useMemo } from 'react'
import { GenreBadge } from '../components/GenreBadge'

// Page de fiche livre avec dettails et historique des prets
export function FicheLivre() {
  const { id } = useParams()
  const { livres, isLoaded } = useLibrary()
  const { handleRetour, handleSupprimer } = useBookActions()
  const navigate = useNavigate()

  // Trouver le livre (memoisé)
  const livre = useMemo(() => {
    return livres.find(l => String(l.id) === String(id))
  }, [livres, id])

  // Calculer les prets en retard (memoisé) - toujours appelé
  const pretsEnRetard = useMemo(() => {
    if (!livre) return []
    const aujourdhui = new Date()
    return livre.prets.filter(p => !p.rendu && new Date(p.dateRetourPrevue) < aujourdhui)
  }, [livre])

  // Verifier si le livre existe
  if (!livre && isLoaded) {
    return (
      <div className="page">
        <h1>Livre introuvable</h1>
        <p>Le livre demandé n'existe pas.</p>
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          Retour a l'accueil
        </button>
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
      <div className="fiche-header">
        <h1>{livre.titre}</h1>
        <Link to="/livres" className="btn btn-secondary btn-sm">
          Retour
        </Link>
      </div>

      <div className="fiche-info">
        <div className="info-item">
          <span className="info-label-bold">Auteur</span>
          <p className="info-value">{livre.auteur}</p>
        </div>
        <div className="info-item">
          <span className="info-label-bold">Genre</span>
          <GenreBadge genre={livre.genre} />
        </div>
        <div className="info-item">
          <span className="info-label-bold">Anne</span>
          <p className="info-value">{livre.annee}</p>
        </div>
        <div className="info-item">
          <span className="info-label-bold">Statut</span>
          <p className="info-value">{livre.disponible ? 'Disponible' : 'Emprunt'}</p>
        </div>
        <div className="info-item">
          <span className="info-label-bold">Nombre de prets</span>
          <p className="info-value">{livre.prets.length}</p>
        </div>
      </div>

      <h2>Actions</h2>
      <div className="book-actions" style={{ marginBottom: '2rem' }}>
        {livre.disponible ? (
          <Link to={`/livres/${livre.id}/preter`} className="btn btn-primary">
            Pretner le livre
          </Link>
        ) : (
          <button className="btn btn-success" onClick={handleRendre}>
            Rendre le livre
          </button>
        )}
        <button className="btn btn-danger" onClick={handleSupprimerLivre}>
          Supprimer
        </button>
      </div>

      <h2>Historique des prets</h2>
      {livre.prets.length === 0 ? (
        <p>Aucun pret</p>
      ) : (
        <table className="table-prets">
          <thead>
            <tr>
              <th>Eleve</th>
              <th>Date de sortie</th>
              <th>Date de retour prevue</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {livre.prets.map((pret, index) => {
              const enRetard = !pret.rendu && pretsEnRetard.includes(pret)
              return (
                <tr key={index} className={enRetard ? 'ligne-retard' : ''}>
                  <td>{pret.eleve}</td>
                  <td>{formaterDate(pret.dateSortie)}</td>
                  <td>{formaterDate(pret.dateRetourPrevue)}</td>
                  <td>
                    {pret.rendu ? 'Renté' : (enRetard ? 'En retard' : 'En cours')}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}

      {pretsEnRetard.length > 0 && (
        <div className="alert alert-warning" style={{ marginTop: '1rem' }}>
          <strong>Attention :</strong> {pretsEnRetard.length} pret(s) en retard pour ce livre.
        </div>
      )}
    </div>
  )
}