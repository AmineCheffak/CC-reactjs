import { Book, UserCheck, BookOpen, AlertCircle } from 'lucide-react'

export function StatCard({ titre, valeur, icone, couleur }) {
  const getBorderClass = () => {
    switch (couleur) {
      case 'total':
        return 'border-l-4 border-blue-600 dark:border-blue-500'
      case 'pret':
      case 'emprunte':
        return 'border-l-4 border-blue-600 dark:border-blue-500'
      case 'disponible':
        return 'border-l-4 border-green-600 dark:border-green-500'
      case 'retard':
        return 'border-l-4 border-amber-600 dark:border-amber-500'
      default:
        return 'border-l-4 border-blue-600 dark:border-blue-500'
    }
  }

  const getColorClass = () => {
    switch (couleur) {
      case 'total':
      case 'pret':
      case 'emprunte':
        return 'text-blue-600 dark:text-blue-500'
      case 'disponible':
        return 'text-green-600 dark:text-green-500'
      case 'retard':
        return 'text-amber-600 dark:text-amber-500'
      default:
        return 'text-blue-600 dark:text-blue-500'
    }
  }

  const getIcon = () => {
    switch (couleur) {
      case 'total':
        return <Book size={24} />
      case 'pret':
      case 'emprunte':
        return <UserCheck size={24} />
      case 'disponible':
        return <BookOpen size={24} />
      case 'retard':
        return <AlertCircle size={24} />
      default:
        return <Book size={24} />
    }
  }

  return (
    <div className={`stat-card flex items-center gap-4 p-5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 ${getBorderClass()}`}>
      <div className={`stat-icone ${getColorClass()}`}>
        {icone || getIcon()}
      </div>
      <div className="stat-contenu flex flex-col">
        <span className="stat-valeur block text-2xl font-bold text-gray-900 dark:text-slate-100">{valeur}</span>
        <span className="stat-titre text-xs text-gray-500 dark:text-slate-400 uppercase tracking-wide">{titre}</span>
      </div>
    </div>
  )
}