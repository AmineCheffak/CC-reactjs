import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useLibrary } from '../hooks/useLibrary'
import { useEffect, useRef, useMemo } from 'react'
import { BookPlus, X, BookOpen, User, Tags, Calendar } from 'lucide-react'

export function AjoutLivre() {
  const { ajouterLivre } = useLibrary()
  const navigate = useNavigate()

  const titresRef = useRef(null)

  const anneeActuelle = useMemo(() => new Date().getFullYear(), [])

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      titre: '',
      auteur: '',
      genre: '',
      annee: anneeActuelle
    }
  })

  const titreRegister = register('titre', {
    required: 'Le titre est obligatoire',
    minLength: {
      value: 2,
      message: 'Le titre doit contenir au moins 2 caractères'
    }
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      if (titresRef.current) {
        titresRef.current.focus()
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const onSubmit = (data) => {
    const nouveauLivre = {
      titre: data.titre.trim(),
      auteur: data.auteur.trim(),
      genre: data.genre.trim(),
      annee: parseInt(data.annee),
      disponible: true,
      prets: []
    }

    ajouterLivre(nouveauLivre)

    navigate('/livres', {
      state: {
        message: 'Livre ajouté avec succès',
        type: 'success'
      }
    })
  }

  const genres = [
    'Roman',
    'Science-fiction',
    'Fantasy',
    'Policier',
    'Biographie',
    'Histoire',
    'Autre'
  ]

  const inputClass = `
    w-full rounded-lg border px-4 py-3 text-sm
    bg-white text-gray-900
    border-gray-300 placeholder:text-gray-400
    outline-none transition-colors duration-200
    focus:border-gray-700 focus:ring-2 focus:ring-gray-200
    dark:bg-neutral-900 dark:text-white
    dark:border-neutral-700 dark:placeholder:text-gray-500
    dark:focus:border-gray-400 dark:focus:ring-neutral-800
  `

  const labelClass = `
    mb-2 block text-sm 
    text-gray-700 dark:text-gray-300
  `

  return (
    <div className="min-h-screen bg-gray-50 p-5 text-gray-900 transition-colors duration-300 dark:bg-neutral-950 dark:text-white sm:p-8 lg:p-10">

      <div className="mb-8">
        <h1 className="text-3xl tracking-tight sm:text-4xl">
          Ajouter un livre
        </h1>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Remplissez les informations pour ajouter un nouveau livre.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto max-w-3xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 sm:p-8"
      >

        <div className="mb-6">

          <label htmlFor="titre" className={labelClass}>
            <BookOpen size={16} className="mr-2 inline-block" />
            Titre *
          </label>

          <input
            id="titre"
            {...titreRegister}
            ref={(element) => {
              titreRegister.ref(element)
              titresRef.current = element
            }}
            className={`${inputClass} ${errors.titre ? 'border-gray-700 dark:border-gray-400' : ''}`}
            placeholder="Entrez le titre du livre"
          />

          {errors.titre && (
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
              {errors.titre.message}
            </p>
          )}

        </div>

        <div className="mb-6">

          <label htmlFor="auteur" className={labelClass}>
            <User size={16} className="mr-2 inline-block" />
            Auteur *
          </label>

          <input
            id="auteur"
            {...register('auteur', {
              required: "L'auteur est obligatoire"
            })}
            className={inputClass}
            placeholder="Entrez le nom de l'auteur"
          />

          {errors.auteur && (
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
              {errors.auteur.message}
            </p>
          )}

        </div>

        <div className="mb-6">

          <label htmlFor="genre" className={labelClass}>
            <Tags size={16} className="mr-2 inline-block" />
            Genre *
          </label>

          <select
            id="genre"
            {...register('genre', {
              required: 'Le genre est obligatoire'
            })}
            className={inputClass}
          >
            <option value="">
              Sélectionnez un genre
            </option>

            {genres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>

          {errors.genre && (
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
              {errors.genre.message}
            </p>
          )}

        </div>

        <div className="mb-8">

          <label htmlFor="annee" className={labelClass}>
            <Calendar size={16} className="mr-2 inline-block" />
            Année de publication *
          </label>

          <input
            id="annee"
            type="number"
            {...register('annee', {
              required: "L'année est obligatoire",
              valueAsNumber: true,
              min: {
                value: 1000,
                message: "L'année doit être supérieure à 1000"
              },
              max: {
                value: anneeActuelle,
                message: "L'année ne peut pas être supérieure à l'année actuelle"
              }
            })}
            className={inputClass}
            min="1000"
            max={anneeActuelle}
          />

          {errors.annee && (
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
              {errors.annee.message}
            </p>
          )}

        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-6 dark:border-neutral-800 sm:flex-row sm:justify-end">

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm text-gray-800 transition-colors hover:bg-gray-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-gray-200 dark:hover:bg-neutral-800"
          >
            <X size={18} className="mr-2" />
            Annuler
          </button>

          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-5 py-3 text-sm text-white transition-colors hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
          >
            <BookPlus size={18} className="mr-2" />
            Ajouter le livre
          </button>

        </div>

      </form>
    </div>
  )
}
