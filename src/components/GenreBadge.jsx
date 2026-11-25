// Badge pour afficher le genre d'un livre
// Reçoit le genre via props
export function GenreBadge({ genre }) {
  // Couleurs selon le genre
  const couleurs = {
    'Roman': 'badge-roman',
    'Science-fiction': 'badge-sf',
    'Fantasy': 'badge-fantasy',
    'Policier': 'badge-policier',
    'Biographie': 'badge-bio',
    'Histoire': 'badge-histoire',
    'Autre': 'badge-autre'
  }

  const classe = couleurs[genre] || 'badge-autre'

  return <span className={`genre-badge ${classe}`}>{genre}</span>
}