import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export function MessageFlash() {
  const location = useLocation()
  const navigate = useNavigate()

  const message = location.state?.message
  const type = location.state?.type || 'success'

  useEffect(() => {
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