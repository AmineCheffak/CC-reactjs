// Carte de statistique pour le tableau de bord
// Reçoit ses données via props
export function StatCard({ titre, valeur, icone, couleur }) {
  return (
    <div className={`stat-card stat-${couleur}`}>
      <div className="stat-icone">{icone}</div>
      <div className="stat-contenu">
        <span className="stat-valeur">{valeur}</span>
        <span className="stat-titre">{titre}</span>
      </div>
    </div>
  )
}