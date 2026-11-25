import { Link } from 'react-router-dom'

export function PageIntrouvable() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center dark:bg-neutral-950">

            <h1 className="mb-4 text-6xl text-gray-900 dark:text-white">
                404
            </h1>

            <h2 className="mb-3 text-2xl text-gray-800 dark:text-gray-200">
                Page introuvable
            </h2>

            <p className="mb-8 text-gray-600 dark:text-gray-400">
                La page demandée n'existe pas.
            </p>

            <Link
                to="/"
                className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-6 py-3 text-sm text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
            >
                Retour à l'accueil
            </Link>

        </div>
    )
}