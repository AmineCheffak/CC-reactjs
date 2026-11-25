import { useForm } from 'react-hook-form'
import { useParams, useNavigate } from 'react-router-dom'
import { useLibrary } from '../hooks/useLibrary'
import { useEffect, useRef } from 'react'
import { Calendar, X, BookPlus } from 'lucide-react'

// Page de prêt d'un livre avec react-hook-form
export function Pret() {
    const { id } = useParams()
    const { livres, preterLivre, isLoaded } = useLibrary()
    const navigate = useNavigate()

    // Référence pour le champ nom de l'élève
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

    // Enregistrement du champ élève
    const eleveRegister = register('eleve', {
        required: "Le nom de l'élève est obligatoire",
        validate: (value) =>
            value.trim().length > 0 || "Le nom de l'élève est obligatoire"
    })

    // Focus automatique sur le champ nom
    useEffect(() => {
        const timer = setTimeout(() => {
            if (nomRef.current) {
                nomRef.current.focus()
            }
        }, 100)

        return () => clearTimeout(timer)
    }, [])

    // Calculer la date minimale de retour (demain)
    const getDateMinimaleRetour = () => {
        const aujourdhui = new Date()
        const demain = new Date(aujourdhui)

        demain.setDate(aujourdhui.getDate() + 1)

        const annee = demain.getFullYear()
        const mois = String(demain.getMonth() + 1).padStart(2, '0')
        const jour = String(demain.getDate()).padStart(2, '0')

        return `${annee}-${mois}-${jour}`
    }

    // Obtenir la date actuelle au format YYYY-MM-DD
    const getDateAujourdhui = () => {
        const date = new Date()

        const annee = date.getFullYear()
        const mois = String(date.getMonth() + 1).padStart(2, '0')
        const jour = String(date.getDate()).padStart(2, '0')

        return `${annee}-${mois}-${jour}`
    }

    // Soumission du formulaire
    const onSubmit = (data) => {
        const nomEleve = data.eleve.trim()

        // Date de sortie = aujourd'hui
        const dateSortie = getDateAujourdhui()

        // Emprunter le livre
        preterLivre(
            id,
            nomEleve,
            dateSortie,
            data.dateRetour
        )

        // Redirection avec message flash
        navigate(`/livres/${id}`, {
            state: {
                message: `Livre prêté à ${nomEleve}`,
                type: 'success'
            }
        })
    }

    // Attendre le chargement des données
    if (!isLoaded) {
        return (
            <div className="page flex flex-col items-center justify-center min-h-[400px]">
                <p className="text-gray-600 dark:text-slate-400">Chargement...</p>
            </div>
        )
    }

    // Vérifier si le livre existe
    const livre = livres.find(
        l => String(l.id) === String(id)
    )

    if (!livre) {
        return (
            <div className="page flex flex-col items-center justify-center min-h-[400px]">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-4">Livre introuvable</h1>

                <p className="text-gray-600 dark:text-slate-400 mb-6">Le livre demandé n'existe pas.</p>

                <button
                    className="btn btn-primary"
                    onClick={() => navigate('/')}
                >
                    <BookPlus size={18} className="mr-2" />
                    Retour à l'accueil
                </button>
            </div>
        )
    }

    // Vérifier si le livre est disponible
    if (!livre.disponible) {
        return (
            <div className="page flex flex-col items-center justify-center min-h-[400px]">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-4">Livre non disponible</h1>

                <p className="text-gray-600 dark:text-slate-400 mb-6">
                    Ce livre n'est pas disponible pour un prêt.
                </p>

                <button
                    className="btn btn-primary"
                    onClick={() => navigate('/')}
                >
                    <BookPlus size={18} className="mr-2" />
                    Retour à l'accueil
                </button>
            </div>
        )
    }

    return (
        <div className="page pret">

            <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-6">
                Prêt : {livre.titre}
            </h1>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">

                <form onSubmit={handleSubmit(onSubmit)}>

                    {/* Nom de l'élève */}
                    <div className="mb-5">

                        <label
                            htmlFor="eleve"
                            className="block mb-2 text-sm font-medium text-gray-700 dark:text-slate-300"
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
                            className="w-full min-h-9 px-3 py-2 text-base border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                            placeholder="Entrez le nom de l'élève"
                        />

                        {errors.eleve && (
                            <span className="mt-1 text-sm text-red-600 dark:text-red-400">
                                {errors.eleve.message}
                            </span>
                        )}

                    </div>

                    {/* Date de retour */}
                    <div className="mb-5">

                        <label
                            htmlFor="dateRetour"
                            className="block mb-2 text-sm font-medium text-gray-700 dark:text-slate-300"
                        >
                            Date de retour prévue *
                        </label>

                        <div className="relative">

                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-400" size={18} />

                            <input
                                id="dateRetour"
                                type="date"
                                {...register('dateRetour', {
                                    required: 'La date de retour est obligatoire',

                                    validate: (value) =>
                                        value >= getDateMinimaleRetour() ||
                                        'La date de retour doit être dans le futur'
                                })}
                                className="w-full min-h-9 pl-10 pr-3 py-2 text-base border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                                min={getDateMinimaleRetour()}
                            />

                        </div>

                        {errors.dateRetour && (
                            <span className="mt-1 text-sm text-red-600 dark:text-red-400">
                                {errors.dateRetour.message}
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
                            Confirmer le prêt
                        </button>

                    </div>

                </form>

            </div>

        </div>
    )
}