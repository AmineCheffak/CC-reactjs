export function GenreBadge({ genre }) {
  const getBadgeStyles = () => {
    switch (genre) {
      case 'Roman':
        return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300'
      case 'Science-fiction':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300'
      case 'Fantasy':
        return 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300'
      case 'Policier':
        return 'bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-300'
      case 'Biographie':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300'
      case 'Histoire':
        return 'bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-300'
      default:
        return 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-300'
    }
  }

  const styles = getBadgeStyles()

  return (
    <span className={`inline-block px-3 py-1 text-xs rounded-full ${styles}`}>
      {genre}
    </span>
  )
}