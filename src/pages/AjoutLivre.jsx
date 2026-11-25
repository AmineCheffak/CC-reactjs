import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useLibrary } from '../hooks/useLibrary'
import { useEffect, useRef, useMemo } from 'react'
import { BookPlus, X } from 'lucide-react'

export function AjoutLivre() {
    const { ajouterLivre } = useLibrary()
    const navigate = useNavigate()

    // Référence pour le champ titre
    const titresRef = useRef(null)

    // Calculer l'année actuelle une seule fois (memoizé)
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

    // Enregistrement du champ titre
    const titreRegister = register('titre', {
        required: 'Le titre est obligatoire',
        minLength: {
            value: 2,
            message: 'Le titre doit contenir au moins 2 caractères'
        }
    })

    // Focus automatique sur le champ titre
    useEffect(() => {
        const timer = setTimeout(() => {
            if (titresRef.current) {
                titresRef.current.focus()
            }
        }, 100)

        return () => clearTimeout(timer)
    }, [])

    // Fonction de soumission
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

        // Redirection avec message flash
        navigate('/livres', {
            state: {
                message: 'Livre ajouté avec succès',
                type: 'success'
            }
        })
    }

    // Genres disponibles
    const genres = [
        'Roman',
        'Science-fiction',
        'Fantasy',
        'Policier',
        'Biographie',
        'Histoire',
        'Autre'
    ]

    return (
        <div className="page ajout-livre">

            <h1>Ajouter un livre</h1>

            <form
                className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700"
                onSubmit={handleSubmit(onSubmit)}
            >

                {/* Titre */}
                <div className="mb-5">

                    <label htmlFor="titre" className="block mb-2 text-sm font-medium text-gray-700 dark:text-slate-300">
                        Titre *
                    </label>

                    <input
                        id="titre"
                        {...titreRegister}
                        ref={(element) => {
                            titreRegister.ref(element)
                            titresRef.current = element
                        }}
                        className="w-full min-h-9 px-3 py-2 text-base border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                        placeholder="Entrez le titre du livre"
                    />

                    {errors.titre && (
                        <span className="mt-1 text-sm text-red-600 dark:text-red-400">
                            {errors.titre.message}
                        </span>
                    )}

                </div>

                {/* Auteur */}
                <div className="mb-5">

                    <label htmlFor="auteur" className="block mb-2 text-sm font-medium text-gray-700 dark:text-slate-300">
                        Auteur *
                    </label>

                    <input
                        id="auteur"
                        {...register('auteur', {
                            required: "L'auteur est obligatoire"
                        })}
                        className="w-full min-h-9 px-3 py-2 text-base border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                        placeholder="Entrez le nom de l'auteur"
                    />

                    {errors.auteur && (
                        <span className="mt-1 text-sm text-red-600 dark:text-red-400">
                            {errors.auteur.message}
                        </span>
                    )}

                </div>

                {/* Genre */}
                <div className="mb-5">

                    <label htmlFor="genre" className="block mb-2 text-sm font-medium text-gray-700 dark:text-slate-300">
                        Genre *
                    </label>

                    <select
                        id="genre"
                        {...register('genre', {
                            required: 'Le genre est obligatoire'
                        })}
                        className="w-full min-h-9 px-3 py-2 text-base border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
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
                        <span className="mt-1 text-sm text-red-600 dark:text-red-400">
                            {errors.genre.message}
                        </span>
                    )}

                </div>

                {/* Année */}
                <div className="mb-5">

                    <label htmlFor="annee" className="block mb-2 text-sm font-medium text-gray-700 dark:text-slate-300">
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
                        className="w-full min-h-9 px-3 py-2 text-base border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                        min="1000"
                        max={anneeActuelle}
                    />

                    {errors.annee && (
                        <span className="mt-1 text-sm text-red-600 dark:text-red-400">
                            {errors.annee.message}
                        </span>
                    )}

                </div>

                {/* Boutons */}
                <div className="flex gap-3">

                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate(-1)}
                    >
                        <X size={18} className="mr-2" />
                        Annuler
                    </button>

                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        <BookPlus size={18} className="mr-2" />
                        Ajouter le livre
                    </button>

                </div>

            </form>

        </div>
    )
}