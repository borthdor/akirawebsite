import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import './Header.css'

function Header() {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isActive = (path) => {
    return location.pathname === path ? 'active' : ''
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setIsMenuOpen(false)
  }

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <Link to="/" className="logo">
            <img src="/assets/logos/AkiraLogo.svg" alt="Akira" />
          </Link>

          <nav className={`navigation ${isMenuOpen ? 'nav-open' : ''}`}>
            <ul className="nav-links">
              <li>
                <Link 
                  to="/" 
                  className={`nav-link ${isActive('/')}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <a 
                  href="#niches" 
                  className="nav-link"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('niches')
                  }}
                >
                  Niches
                </a>
              </li>
              <li>
                <a 
                  href="#testimonials" 
                  className="nav-link"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('testimonials')
                  }}
                >
                  Testimonials
                </a>
              </li>
              <li>
                <a 
                  href="#faq" 
                  className="nav-link"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('faq')
                  }}
                >
                  FAQ
                </a>
              </li>
              <li>
                <Link 
                  to="/blog" 
                  className={`nav-link ${isActive('/blog')}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blog
                </Link>
              </li>
            </ul>
          </nav>

          <div className="auth-section">
            <a href="https://whop.com/c/akira/website" target="_blank" rel="noopener noreferrer" className="sign-up">Sign Up</a>
            <a href="https://whop.com/c/akira/website" target="_blank" rel="noopener noreferrer" className="dashboard-btn">
              <span>Dashboard</span>
              <div className="icon-container">
                <ArrowRight size={12} color="#fff" />
              </div>
            </a>
          </div>

          <button 
            className="mobile-menu-toggle" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header


