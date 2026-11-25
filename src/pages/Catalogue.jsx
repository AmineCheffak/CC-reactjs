import { useState, useMemo, useRef, useEffect } from 'react'
import { BookCard } from '../components/BookCard'
import { useLibrary } from '../hooks/useLibrary'
import { useBookActions } from '../hooks/useBookActions'
import { useNavigate } from 'react-router-dom'

// Page du catalogue avec recherche et filtres
export function Catalogue() {
  const { livres } = useLibrary()
  const { handleRetour, handleSupprimer } = useBookActions()
  const navigate = useNavigate()

  // États pour la recherche et les filtres
  const [recherche, setRecherche] = useState('')
  const [filtreGenre, setFiltreGenre] = useState('')
  const [filtreDisponible, setFiltreDisponible] = useState('')

  // Ref pour le champ de recherche (focus au montage)
  const rechercheRef = useRef()

  // Focus automatique sur le champ de recherche
  useEffect(() => {
    const timer = setTimeout(() => {
      if (rechercheRef.current) {
        rechercheRef.current.focus()
      }
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  // Genres uniques pour le filtre
  const genres = useMemo(() => {
    const genreSet = new Set(livres.map(l => l.genre))
    return Array.from(genreSet)
  }, [livres])

  // Catalogue filtré (memoisé)
  const livresFiltres = useMemo(() => {
    return livres.filter(livre => {
      // Filtre par recherche (titre ou auteur)
      const correspondRecherche = recherche === '' ||
        livre.titre.toLowerCase().includes(recherche.toLowerCase()) ||
        livre.auteur.toLowerCase().includes(recherche.toLowerCase())

      // Filtre par genre
      const correspondGenre = filtreGenre === '' || livre.genre === filtreGenre

      // Filtre par disponibilité
      const correspondDisponible = filtreDisponible === '' ||
        (filtreDisponible === 'disponible' && livre.disponible) ||
        (filtreDisponible === 'emprunte' && !livre.disponible)

      return correspondRecherche && correspondGenre && correspondDisponible
    })
  }, [livres, recherche, filtreGenre, filtreDisponible])

  const handleRecherche = (e) => {
    setRecherche(e.target.value)
  }

  const handleFiltreGenre = (e) => {
    setFiltreGenre(e.target.value)
  }

  const handleFiltreDisponible = (e) => {
    setFiltreDisponible(e.target.value)
  }

  const handleAjouter = () => {
    navigate('/livres/nouveau')
  }

  const handleExport = () => {
    const element = document.createElement('a')
    const fichier = JSON.stringify(livres, null, 2)
    const blob = new Blob([fichier], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    element.setAttribute('href', url)
    element.setAttribute('download', 'catalogue.json')
    element.click()
  }

  return (
    <div className="page catalogue">
      <h1>Catalogue des livres</h1>

      <div className="catalogue-header">
        <button className="btn btn-primary" onClick={handleAjouter}>
          + Ajouter un livre
        </button>
        <button className="btn btn-secondary" onClick={handleExport}>
          Exporter JSON
        </button>
      </div>

      <div className="filters-row">
        <div className="form-group search-bar">
          <input
            ref={rechercheRef}
            type="text"
            placeholder="Rechercher par titre ou auteur..."
            value={recherche}
            onChange={handleRecherche}
            className="form-input form-input-search"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="filtreGenre">Genre</label>
          <select
            id="filtreGenre"
            value={filtreGenre}
            onChange={handleFiltreGenre}
            className="form-select"
          >
            <option value="">Tous les genres</option>
            {genres.map(g => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="filtreDispo">Disponibilite</label>
          <select
            id="filtreDispo"
            value={filtreDisponible}
            onChange={handleFiltreDisponible}
            className="form-select"
          >
            <option value="">Tous les livres</option>
            <option value="disponible">Disponibles</option>
            <option value="emprunte">Empruntes</option>
          </select>
        </div>
      </div>

      {livresFiltres.length === 0 ? (
        <p>Aucun livre trouve</p>
      ) : (
        <div className="book-grid">
          {livresFiltres.map(livre => (
            <BookCard
              key={livre.id}
              livre={livre}
              onPret={handleRetour}
              onDelete={handleSupprimer}
            />
          ))}
        </div>
      )}
    </div>
  )
}