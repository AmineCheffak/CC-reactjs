import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LibraryProvider } from './context/LibraryContextProvider'
import { ThemeProvider } from './context/ThemeContextProvider'
import { Navbar } from './components/Navbar'
import { MessageFlash } from './components/MessageFlash'
import { Dashboard } from './pages/Dashboard'
import { Catalogue } from './pages/Catalogue'
import { AjoutLivre } from './pages/AjoutLivre'
import { FicheLivre } from './pages/FicheLivre'
import { Pret } from './pages/Pret'
import { PageIntrouvable } from './pages/PageIntrouvable'
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <LibraryProvider>
        <BrowserRouter>
          <div className="app">
            <Navbar />
            <main className="main-content">
              <MessageFlash />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/livres" element={<Catalogue />} />
                <Route path="/livres/nouveau" element={<AjoutLivre />} />
                <Route path="/livres/:id" element={<FicheLivre />} />
                <Route path="/livres/:id/preter" element={<Pret />} />
                <Route path="*" element={<PageIntrouvable />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </LibraryProvider>
    </ThemeProvider>
  )
}

export default App