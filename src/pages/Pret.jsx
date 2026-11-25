import { useForm } from 'react-hook-form'
import { useParams, useNavigate } from 'react-router-dom'
import { useLibrary } from '../hooks/useLibrary'
import { useEffect, useRef } from 'react'

// Page de prêt d'un livre avec react-hook-form
export function Pret() {
  const { id } = useParams()
  const { livres, preterLivre, isLoaded } = useLibrary()
  const navigate = useNavigate()

  // Référence pour le champ nom de l'élève (focus automatique)
  const nomRef = useRef()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      eleve: '',
      dateRetour: ''
    }
  })

  // Focus automatique sur le champ nom de l'élève au montage
  useEffect(() => {
    const timer = setTimeout(() => {
      if (nomRef.current) {
        nomRef.current.focus()
      }
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  // Calculer la date minimale (demain) pour la date de retour
  const getDateMinimaleRetour = () => {
    const aujourdhui = new Date()
    const demain = new Date(aujourdhui)
    demain.setDate(aujourdhui.getDate() + 1)
    return demain.toISOString().split('T')[0]
  }

  const onSubmit = (data) => {
    // Date de sortie = aujourd'hui
    const dateSortie = new Date().toISOString().split('T')[0]

    preterLivre(id, data.eleve.trim(), dateSortie, data.dateRetour)

    // Redirection avec message flash
    navigate(`/livres/${id}`, {
      state: { message: `Livre prete a ${data.eleve}`, type: 'success' }
    })
  }

  // Vérifier si le livre existe
  const livre = livres.find(l => String(l.id) === String(id))

  if (!livre && isLoaded) {
    return (
      <div className="page">
        <h1>Livre introuvable</h1>
        <p>Le livre demandé n'existe pas.</p>
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          Retour a l'accueil
        </button>
      </div>
    )
  }

  if (!livre || livre.disponible) {
    return (
      <div className="page">
        <h1>Livre non disponible</h1>
        <p>Ce livre n'est pas disponible pour un pret.</p>
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          Retour a l'accueil
        </button>
      </div>
    )
  }

  return (
    <div className="page pret">
      <h1>Pret : {livre.titre}</h1>

      <div className="pret-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="eleve" className="form-label">
              Nom de l'eleve *
            </label>
            <input
              id="eleve"
              {...register('eleve', {
                required: "Le nom de l'eleve est obligatoire"
              })}
              ref={(e) => {
                nomRef.current = e
              }}
              className="form-input"
              placeholder="Entrez le nom de l'eleve"
            />
            {errors.eleve && <span className="form-error">{errors.eleve.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="dateRetour" className="form-label">
              Date de retour prevue *
            </label>
            <input
              id="dateRetour"
              type="date"
              {...register('dateRetour', {
                required: 'La date de retour est obligatoire',
                validate: (value) => {
                  const dateRetour = new Date(value)
                  const aujourdhui = new Date()
                  // La date doit etre strictement future
                  return dateRetour > aujourdhui || 'La date de retour doit etre dans le futur'
                }
              })}
              className="form-input"
              min={getDateMinimaleRetour()}
            />
            {errors.dateRetour && <span className="form-error">{errors.dateRetour.message}</span>}
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
              Annuler
            </button>
            <button type="submit" className="btn btn-primary">
              Confirmer le pret
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}