import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useLibrary } from '../hooks/useLibrary'
import { useEffect, useRef } from 'react'

// Page d'ajout d'un livre avec react-hook-form
export function AjoutLivre() {
  const { ajouterLivre } = useLibrary()
  const navigate = useNavigate()

  // Référence pour le champ titre (focus automatique)
  const titresRef = useRef()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      titre: '',
      auteur: '',
      genre: '',
      annee: new Date().getFullYear()
    }
  })

  // Focus automatique sur le champ titre au montage
  useEffect(() => {
    // La référence est liée au champ titre via register
    const timer = setTimeout(() => {
      if (titresRef.current) {
        titresRef.current.focus()
      }
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  const onSubmit = (data) => {
    // L'ID est généré dans le reducer pour éviter les problèmes de pureté
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
      state: { message: 'Livre ajouté avec succès', type: 'success' }
    })
  }

  // Genres disponibles pour le formulaire
  const genres = ['Roman', 'Science-fiction', 'Fantasy', 'Policier', 'Biographie', 'Histoire', 'Autre']

  return (
    <div className="page ajout-livre">
      <h1>Ajouter un livre</h1>

      <form className="form-section" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="titre" className="form-label">
            Titre *
          </label>
          <input
            id="titre"
            {...register('titre', {
              required: 'Le titre est obligatoire',
              minLength: {
                value: 2,
                message: 'Le titre doit contenir au moins 2 caractères'
              }
            })}
            ref={(e) => {
              // Combine register avec notre ref pour le focus
              titresRef.current = e
            }}
            className="form-input"
            placeholder="Entrez le titre du livre"
          />
          {errors.titre && <span className="form-error">{errors.titre.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="auteur" className="form-label">
            Auteur *
          </label>
          <input
            id="auteur"
            {...register('auteur', {
              required: 'L\'auteur est obligatoire'
            })}
            className="form-input"
            placeholder="Entrez le nom de l'auteur"
          />
          {errors.auteur && <span className="form-error">{errors.auteur.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="genre" className="form-label">
            Genre *
          </label>
          <select
            id="genre"
            {...register('genre', {
              required: 'Le genre est obligatoire'
            })}
            className="form-select"
          >
            <option value="">Sélectionnez un genre</option>
            {genres.map(g => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
          {errors.genre && <span className="form-error">{errors.genre.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="annee" className="form-label">
            Année de publication *
          </label>
          <input
            id="annee"
            type="number"
            {...register('annee', {
              required: 'L\'année est obligatoire',
              max: {
                value: new Date().getFullYear(),
                message: `L'année ne peut pas être supérieure à ${new Date().getFullYear()}`
              }
            })}
            className="form-input"
            min="1000"
            max={new Date().getFullYear()}
          />
          {errors.annee && <span className="form-error">{errors.annee.message}</span>}
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
            Annuler
          </button>
          <button type="submit" className="btn btn-primary">
            Ajouter le livre
          </button>
        </div>
      </form>
    </div>
  )
}