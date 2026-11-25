import { useContext } from 'react'
import { LibraryContext } from './LibraryContext'

export function useLibrary() {
  const context = useContext(LibraryContext)
  if (!context) {
    throw new Error('useLibrary doit être utilisé dans un LibraryProvider')
  }
  return context
}