import { useContext } from 'react'
import { LibraryContext } from './LibraryContext'

// Hook personnalisé pour accéder au contexte de la bibliothèque
export function useLibrary() {
  const context = useContext(LibraryContext)
  if (!context) {
    throw new Error('useLibrary doit être utilisé dans un LibraryProvider')
  }
  return context
}