import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Navbar } from './components/layouts/Navbar.tsx'
import { Footer } from './components/layouts/Footer.tsx'
import { BrowserRouter } from 'react-router-dom'
import ScrollToTop from './components/layouts/ScrollToTop.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <ScrollToTop />
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
