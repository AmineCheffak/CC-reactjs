import { Book, UserCheck, BookOpen, AlertCircle } from 'lucide-react'

export function StatCard({ titre, valeur, icone, couleur }) {

    const getIcon = () => {
        switch (couleur) {
            case 'total':
                return <Book size={24} />

            case 'pret':
            case 'emprunte':
                return <UserCheck size={24} />

            case 'disponible':
                return <BookOpen size={24} />

            case 'retard':
                return <AlertCircle size={24} />

            default:
                return <Book size={24} />
        }
    }

    return (
        <div className="
            flex items-center gap-4 p-5
            bg-white dark:bg-white/10
            border border-gray-200 dark:border-gray-800
            border-l-4 border-l-black dark:border-l-white
            rounded-xl shadow-sm
            hover:shadow-md dark:hover:shadow-white/5
            hover:-translate-y-1
            transition-all duration-200
        ">

            {/* Icon */}

            <div className="
                flex items-center justify-center
                w-12 h-12 rounded-xl
                bg-gray-100 dark:bg-white/10
                text-black dark:text-white
            ">
                {icone || getIcon()}
            </div>

            {/* Content */}

            <div className="flex flex-col gap-1">

                <span className="
                    text-2xl font-bold
                    text-black dark:text-white
                ">
                    {valeur}
                </span>

                <span className="
                    text-xs font-semibold
                    text-gray-500 dark:text-gray-400
                    uppercase tracking-wider
                ">
                    {titre}
                </span>

            </div>

        </div>
    )
}
