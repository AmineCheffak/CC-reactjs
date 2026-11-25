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
        pathname.startsWith('/livres') &&
        pathname !== '/livres/nouveau'

    const classe = ({ isActive }) =>
        `flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-colors duration-200
        ${
            isActive
                ? 'bg-gray-200 text-gray-900 dark:bg-neutral-800 dark:text-white'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-neutral-800 dark:hover:text-white'
        }`

    const label =
        theme === 'light'
            ? 'Passer en mode sombre'
            : 'Passer en mode clair'

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">

            <nav className="mx-auto flex min-h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                <Link
                    to="/"
                    className="flex items-center gap-2 text-xl font-bold text-gray-900 transition hover:text-gray-600 dark:text-white dark:hover:text-gray-300"
                >
                    <Library size={24} />
                    <span>BiblioApp</span>
                </Link>

                <ul className="flex items-center gap-1 sm:gap-2">

                    <li>
                        <NavLink
                            to="/"
                            end
                            className={classe}
                        >
                            <LayoutDashboard size={18} />

                            <span className="hidden md:inline">
                                Tableau de bord
                            </span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/livres"
                            className={() =>
                                classe({
                                    isActive: catalogueActif
                                })
                            }
                        >
                            <BookOpen size={18} />

                            <span className="hidden md:inline">
                                Catalogue
                            </span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/livres/nouveau"
                            className={classe}
                        >
                            <CirclePlus size={18} />

                            <span className="hidden md:inline">
                                Ajouter un livre
                            </span>
                        </NavLink>
                    </li>

                    <li>
                        <button
                            type="button"
                            onClick={toggleTheme}
                            aria-label={label}
                            title={label}
                            className="ml-2 flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-gray-100 text-gray-800 transition-all duration-200 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:border-neutral-700 dark:bg-neutral-800 dark:text-gray-200 dark:hover:bg-neutral-700 dark:focus:ring-neutral-500"
                        >
                            {theme === 'light' ? (
                                <Sun size={20} />
                            ) : (
                                <Moon size={20} />
                            )}
                        </button>
                    </li>

                </ul>

            </nav>

        </header>
    )
}