import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

// Composant pour afficher les messages flash (succès, erreur)
// Le message est passé via location.state
export function MessageFlash() {
  const location = useLocation()
  const navigate = useNavigate()

  const message = location.state?.message
  const type = location.state?.type || 'success'

  useEffect(() => {
    // Nettoyer le message après affichage (remplacer l'historique sans le state)
    if (message) {
      navigate(location.pathname, { replace: true })
    }
  }, [message, navigate, location.pathname])

  if (!message) return null

  return (
    <div className={`flash-message flash-${type}`} role="alert">
      <span>{message}</span>
      <button onClick={() => navigate(location.pathname, { replace: true })} aria-label="Fermer">×</button>
    </div>
  )
}