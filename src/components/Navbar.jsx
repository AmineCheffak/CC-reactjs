import { Link, NavLink, useLocation } from 'react-router-dom'
import {
  Library,
  LayoutDashboard,
  BookOpen,
  CirclePlus,
  Moon,
  Sun
} from 'lucide-react'

import { useTheme } from '../hooks/useTheme'

export function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const { pathname } = useLocation()

  const catalogueActif =
    pathname.startsWith('/livres') && pathname !== '/livres/nouveau'

  const classe = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200
    ${
      isActive
        ? 'text-blue-500 bg-blue-500/10'
        : 'text-gray-600 dark:text-gray-300 hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-800'
    }`

  const label =
    theme === 'light'
      ? 'Passer en mode sombre'
      : 'Passer en mode clair'

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-gray-900/95">
      <nav className="mx-auto flex min-h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-blue-600 transition hover:text-blue-700 dark:text-blue-400"
        >
          <Library size={24} />
          <span>BiblioApp</span>
        </Link>

        {/* Navigation */}
        <ul className="flex items-center gap-1 sm:gap-2">

          <li>
            <NavLink to="/" end className={classe}>
              <LayoutDashboard size={18} />
              <span className="hidden md:inline">Tableau de bord</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/livres"
              className={() => classe({ isActive: catalogueActif })}
            >
              <BookOpen size={18} />
              <span className="hidden md:inline">Catalogue</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/livres/nouveau" className={classe}>
              <CirclePlus size={18} />
              <span className="hidden md:inline">Ajouter un livre</span>
            </NavLink>
          </li>

          {/* Theme Toggle */}
          <li>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={label}
              title={label}
              className="ml-2 flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-gray-100 text-gray-700 transition-all duration-200 hover:bg-gray-200 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-yellow-400 dark:hover:bg-gray-700"
            >
              {theme === 'light' ? (
                <Moon size={20} />
              ) : (
                <Sun size={20} />
              )}
            </button>
          </li>

        </ul>
      </nav>
    </header>
  )
}