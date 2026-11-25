import { Link } from 'react-router-dom'

// Page 404 - route inconnue
export function PageIntrouvable() {
  return (
    <div className="page page-404">
      <h1>404 - Page introuvable</h1>
      <p>La page demandée n'existe pas.</p>
      <Link to="/" className="btn btn-primary">Retour à l'accueil</Link>
    </div>
  )
}