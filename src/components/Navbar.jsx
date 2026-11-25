import { NavLink } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'

// Barre de navigation principale
export function Navbar() {
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <NavLink to="/" className="brand-link">📚 BiblioApp</NavLink>
      </div>
      <ul className="nav-links">
        <li>
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Tableau de bord
          </NavLink>
        </li>
        <li>
          <NavLink to="/livres" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Catalogue
          </NavLink>
        </li>
        <li>
          <NavLink to="/livres/nouveau" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Ajouter un livre
          </NavLink>
        </li>
        <li>
          <button className="theme-toggle" onClick={toggleTheme} aria-label={theme === 'light' ? 'Passer en mode sombre' : 'Passer en mode clair'}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </li>
      </ul>
    </nav>
  )
}