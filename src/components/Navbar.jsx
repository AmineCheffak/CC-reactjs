import { Link, NavLink, useLocation } from 'react-router-dom'
import { Library, LayoutDashboard, BookOpen, CirclePlus, Moon, Sun } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

// Barre de navigation principale
export function Navbar() {
  const { theme, toggleTheme } = useTheme()
  // useLocation : savoir sur quelle page on est
  const { pathname } = useLocation()

  // "Catalogue" reste actif sur la fiche et le prêt, mais pas sur l'ajout
  const catalogueActif =
    pathname.startsWith('/livres') && pathname !== '/livres/nouveau'

  const classe = ({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')
  const label = theme === 'light' ? 'Passer en mode sombre' : 'Passer en mode clair'

  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/" className="brand-link">
          <Library size={22} aria-hidden="true" /> BiblioApp
        </Link>
        <ul className="nav-links">
          <li>
            <NavLink to="/" end className={classe}>
              <LayoutDashboard size={18} aria-hidden="true" /> Tableau de bord
            </NavLink>
          </li>
          <li>
            <NavLink to="/livres" className={() => classe({ isActive: catalogueActif })}>
              <BookOpen size={18} aria-hidden="true" /> Catalogue
            </NavLink>
          </li>
          <li>
            <NavLink to="/livres/nouveau" className={classe}>
              <CirclePlus size={18} aria-hidden="true" /> Ajouter un livre
            </NavLink>
          </li>
          <li>
            <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label={label} title={label}>
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  )
}