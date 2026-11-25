import { useState, useMemo, useRef, useEffect } from 'react'
import { BookCard } from '../components/BookCard'
import { useLibrary } from '../hooks/useLibrary'
import { useBookActions } from '../hooks/useBookActions'
import { useNavigate } from 'react-router-dom'
import { Search, Filter, Download, Plus } from 'lucide-react'

export function Catalogue() {
  const { livres } = useLibrary()
  const { handleRetour, handleSupprimer } = useBookActions()
  const navigate = useNavigate()

  const [recherche, setRecherche] = useState('')
  const [filtreGenre, setFiltreGenre] = useState('')
  const [filtreDisponible, setFiltreDisponible] = useState('')

  const rechercheRef = useRef()

  useEffect(() => {
    const timer = setTimeout(() => {
      if (rechercheRef.current) {
        rechercheRef.current.focus()
      }
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  const genres = useMemo(() => {
    const genreSet = new Set(livres.map(l => l.genre))
    return Array.from(genreSet)
  }, [livres])

  const livresFiltres = useMemo(() => {
    return livres.filter(livre => {
      const correspondRecherche = recherche === '' ||
        livre.titre.toLowerCase().includes(recherche.toLowerCase()) ||
        livre.auteur.toLowerCase().includes(recherche.toLowerCase())

      const correspondGenre = filtreGenre === '' || livre.genre === filtreGenre

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

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <button className="btn btn-primary" onClick={handleAjouter}>
          <Plus size={18} className="mr-2" />
          <span>Ajouter un livre</span>
        </button>
        <button className="btn btn-secondary" onClick={handleExport}>
          <Download size={18} className="mr-2" />
          <span>Exporter JSON</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-400" size={18} />
          <input
            ref={rechercheRef}
            type="text"
            placeholder="Rechercher par titre ou auteur..."
            value={recherche}
            onChange={handleRecherche}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-400" size={18} />
            <select
              id="filtreGenre"
              value={filtreGenre}
              onChange={handleFiltreGenre}
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            >
              <option value="">Tous les genres</option>
              {genres.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          <select
            id="filtreDispo"
            value={filtreDisponible}
            onChange={handleFiltreDisponible}
            className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          >
            <option value="">Tous les livres</option>
            <option value="disponible">Disponibles</option>
            <option value="emprunte">Empruntés</option>
          </select>
        </div>
      </div>

      {livresFiltres.length === 0 ? (
        <p className="text-gray-600 dark:text-slate-400">Aucun livre trouvé</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
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