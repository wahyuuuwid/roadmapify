import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Navbar } from './components/layouts/Navbar'
import { Footer } from './components/layouts/Footer'
import { BrowserRouter } from 'react-router-dom'
import ScrollToTop from './components/layouts/ScrollToTop'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <ScrollToTop />
    <Toaster position="bottom-right" richColors  /> 
    <div className="min-h-screen flex flex-col">
      <Navbar />
        <main className="grow">
        <App />
      </main>
      <Footer />
    </div>
    </BrowserRouter>
  </StrictMode>,
)
