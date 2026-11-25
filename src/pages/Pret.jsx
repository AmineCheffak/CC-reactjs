import { useForm } from 'react-hook-form'
import { useParams, useNavigate } from 'react-router-dom'
import { useLibrary } from '../hooks/useLibrary'
import { useEffect, useRef } from 'react'
import { Calendar, X, BookPlus } from 'lucide-react'

export function Pret() {
    const { id } = useParams()
    const { livres, preterLivre, isLoaded } = useLibrary()
    const navigate = useNavigate()

    const nomRef = useRef(null)

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            eleve: '',
            dateRetour: ''
        }
    })

    const eleveRegister = register('eleve', {
        required: "Le nom de l'élève est obligatoire",
        validate: (value) =>
            value.trim().length > 0 ||
            "Le nom de l'élève est obligatoire"
    })

    useEffect(() => {
        const timer = setTimeout(() => {
            if (nomRef.current) {
                nomRef.current.focus()
            }
        }, 100)

        return () => clearTimeout(timer)
    }, [])

    const getDateMinimaleRetour = () => {
        const aujourdhui = new Date()
        const demain = new Date(aujourdhui)

        demain.setDate(aujourdhui.getDate() + 1)

        const annee = demain.getFullYear()
        const mois = String(demain.getMonth() + 1).padStart(2, '0')
        const jour = String(demain.getDate()).padStart(2, '0')

        return `${annee}-${mois}-${jour}`
    }

    const getDateAujourdhui = () => {
        const date = new Date()

        const annee = date.getFullYear()
        const mois = String(date.getMonth() + 1).padStart(2, '0')
        const jour = String(date.getDate()).padStart(2, '0')

        return `${annee}-${mois}-${jour}`
    }

    const onSubmit = (data) => {
        const nomEleve = data.eleve.trim()

        const dateSortie = getDateAujourdhui()

        preterLivre(
            id,
            nomEleve,
            dateSortie,
            data.dateRetour
        )

        navigate(`/livres/${id}`, {
            state: {
                message: `Livre prêté à ${nomEleve}`,
                type: 'success'
            }
        })
    }

    const inputClass =
        'w-full min-h-10 rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:placeholder-neutral-500 dark:focus:border-neutral-500 dark:focus:ring-neutral-800'

    const labelClass =
        'mb-2 block text-sm text-gray-700 dark:text-gray-300'

    const errorClass =
        'mt-1 block text-sm text-red-600 dark:text-red-400'

    const buttonPrimary =
        'inline-flex items-center justify-center rounded-lg bg-gray-900 px-5 py-2.5 text-sm text-white transition hover:bg-gray-700 disabled:cursor-not-allowed dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200'

    const buttonSecondary =
        'inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm text-gray-700 transition hover:bg-gray-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-gray-300 dark:hover:bg-neutral-800'

    if (!isLoaded) {
        return (
            <div className="flex min-h-[400px] items-center justify-center bg-gray-50 dark:bg-neutral-950">
                <p className="text-gray-600 dark:text-gray-400">
                    Chargement...
                </p>
            </div>
        )
    }

    const livre = livres.find(
        l => String(l.id) === String(id)
    )

    if (!livre) {
        return (
            <div className="flex min-h-[400px] flex-col items-center justify-center bg-gray-50 px-4 text-center dark:bg-neutral-950">
                <h1 className="mb-4 text-2xl text-gray-900 dark:text-white">
                    Livre introuvable
                </h1>

                <p className="mb-6 text-gray-600 dark:text-gray-400">
                    Le livre demandé n'existe pas.
                </p>

                <button
                    className={buttonPrimary}
                    onClick={() => navigate('/')}
                >
                    <BookPlus size={18} className="mr-2" />
                    Retour à l'accueil
                </button>
            </div>
        )
    }

    if (!livre.disponible) {
        return (
            <div className="flex min-h-[400px] flex-col items-center justify-center bg-gray-50 px-4 text-center dark:bg-neutral-950">
                <h1 className="mb-4 text-2xl text-gray-900 dark:text-white">
                    Livre non disponible
                </h1>

                <p className="mb-6 text-gray-600 dark:text-gray-400">
                    Ce livre n'est pas disponible pour un prêt.
                </p>

                <button
                    className={buttonPrimary}
                    onClick={() => navigate('/')}
                >
                    <BookPlus size={18} className="mr-2" />
                    Retour à l'accueil
                </button>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8 dark:bg-neutral-950 sm:px-6">

            <div className="mx-auto max-w-2xl">

                <div className="mb-6">
                    <h1 className="text-2xl text-gray-900 dark:text-white">
                        Prêt : {livre.titre}
                    </h1>

                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Remplissez les informations pour enregistrer le prêt.
                    </p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 sm:p-8">

                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="mb-6">

                            <label
                                htmlFor="eleve"
                                className={labelClass}
                            >
                                Nom de l'élève *
                            </label>

                            <input
                                id="eleve"
                                {...eleveRegister}
                                ref={(element) => {
                                    eleveRegister.ref(element)
                                    nomRef.current = element
                                }}
                                className={inputClass}
                                placeholder="Entrez le nom de l'élève"
                            />

                            {errors.eleve && (
                                <span className={errorClass}>
                                    {errors.eleve.message}
                                </span>
                            )}

                        </div>

                        <div className="mb-8">

                            <label
                                htmlFor="dateRetour"
                                className={labelClass}
                            >
                                Date de retour prévue *
                            </label>

                            <div className="relative">

                                <Calendar
                                    size={18}
                                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
                                />

                                <input
                                    id="dateRetour"
                                    type="date"
                                    {...register('dateRetour', {
                                        required: 'La date de retour est obligatoire',

                                        validate: (value) =>
                                            value >= getDateMinimaleRetour() ||
                                            'La date de retour doit être dans le futur'
                                    })}
                                    className={`${inputClass} pl-10`}
                                    min={getDateMinimaleRetour()}
                                />

                            </div>

                            {errors.dateRetour && (
                                <span className={errorClass}>
                                    {errors.dateRetour.message}
                                </span>
                            )}

                        </div>

                        <div className="flex flex-col gap-3 border-t border-gray-200 pt-5 dark:border-neutral-800 sm:flex-row sm:justify-end">

                            <button
                                type="button"
                                className={buttonSecondary}
                                onClick={() => navigate(-1)}
                            >
                                <X size={18} className="mr-2" />
                                Annuler
                            </button>

                            <button
                                type="submit"
                                className={buttonPrimary}
                            >
                                <BookPlus size={18} className="mr-2" />
                                Confirmer le prêt
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    )
}