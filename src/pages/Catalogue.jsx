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

    URL.revokeObjectURL(url)
  }

  const inputClass = "w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-colors focus:border-gray-700 focus:ring-2 focus:ring-gray-200 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-gray-400 dark:focus:ring-neutral-800"

  return (
    <div className="min-h-screen bg-gray-50 p-5 text-gray-900 transition-colors duration-300 dark:bg-neutral-950 dark:text-white sm:p-8 lg:p-10">

      <div className="mb-8">
        <h1 className="text-3xl tracking-tight sm:text-4xl">
          Catalogue des livres
        </h1>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Consultez et gérez les livres de votre bibliothèque.
        </p>
      </div>

      {/* Boutons */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">

        <button
          onClick={handleAjouter}
          className="inline-flex items-center rounded-lg bg-gray-900 px-5 py-3 text-sm text-white shadow-sm transition-all hover:bg-gray-700 active:scale-95 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
        >
          <Plus size={18} className="mr-2" />
          Ajouter un livre
        </button>

        <button
          onClick={handleExport}
          className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm text-gray-800 transition-all hover:bg-gray-100 active:scale-95 dark:border-neutral-700 dark:bg-neutral-900 dark:text-gray-200 dark:hover:bg-neutral-800"
        >
          <Download size={18} className="mr-2" />
          Exporter JSON
        </button>

      </div>

      <div className="mb-8 flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 sm:flex-row sm:items-center sm:justify-between">

        <div className="relative w-full sm:max-w-sm">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
          />

          <input
            ref={rechercheRef}
            type="text"
            placeholder="Rechercher par titre ou auteur..."
            value={recherche}
            onChange={handleRecherche}
            className={`${inputClass} pl-10`}
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">

          <div className="relative">
            <Filter
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
            />

            <select
              id="filtreGenre"
              value={filtreGenre}
              onChange={handleFiltreGenre}
              className={`${inputClass} pl-10 sm:min-w-44`}
            >
              <option value="">Tous les genres</option>

              {genres.map(g => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          <select
            id="filtreDispo"
            value={filtreDisponible}
            onChange={handleFiltreDisponible}
            className={`${inputClass} sm:min-w-44`}
          >
            <option value="">Tous les livres</option>
            <option value="disponible">Disponibles</option>
            <option value="emprunte">Empruntés</option>
          </select>

        </div>
      </div>

      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Résultats :
          <span className="ml-1 text-gray-900 dark:text-white">
            {livresFiltres.length}
          </span>
        </p>
      </div>

      {livresFiltres.length === 0 ? (

        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white px-5 py-16 text-center dark:border-neutral-700 dark:bg-neutral-900">

          <Search size={36} className="mb-4 text-gray-400 dark:text-gray-500" />

          <h2 className="text-lg">
            Aucun livre trouvé
          </h2>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Essayez de modifier votre recherche ou vos filtres.
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

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
