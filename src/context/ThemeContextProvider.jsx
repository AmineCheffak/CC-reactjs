import { useState, useEffect } from 'react'
import { ThemeContext } from './ThemeContext'

// Provider pour le thème (séparé du Context pour Fast Refresh)
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Lire le thème depuis localStorage au démarrage
    const saved = localStorage.getItem('biblioapp_theme')
    if (saved) return saved
    // Sinon détecter la préférence système
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  // Appliquer la classe sur <html> pour le CSS
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(theme)
    localStorage.setItem('biblioapp_theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light')

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}