import React from 'react';
import { Twitter, Instagram, MessageCircle } from 'lucide-react';
import './Footer.css';

function Footer() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <footer className="footer">
      {/* First Divider - Full Width */}
      <div className="footer-divider-full"></div>
      
      {/* Footer Content - Constrained */}
      <div className="footer-content-wrapper">
        <div className="footer-container">
          <div className="footer-content">
            {/* Left Side - Logo and Tagline */}
            <div className="footer-left">
              <div className="footer-logo">
                <img src="/assets/logos/AkiraLogo.svg" alt="Akira" />
              </div>
              <p className="footer-tagline">Follow the path to success</p>
            </div>
            
            {/* Right Side - Navigation and Social */}
            <div className="footer-right">
              {/* Navigation */}
              <div className="footer-column">
                <h4 className="footer-heading">Navigation</h4>
                <ul className="footer-links">
                  <li>
                    <a 
                      href="#home" 
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection('home')
                      }}
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#niches" 
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
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection('faq')
                      }}
                    >
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#blogs" 
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection('blogs')
                      }}
                    >
                      Blogs
                    </a>
                  </li>
                </ul>
              </div>
              
              {/* Social Media */}
              <div className="footer-column">
                <h4 className="footer-heading">Social Media</h4>
                <ul className="footer-links">
                  <li>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                      <Instagram size={16} className="footer-icon" />
                      <span>Instagram</span>
                    </a>
                  </li>
                  <li>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                      <Twitter size={16} className="footer-icon" />
                      <span>Twitter</span>
                    </a>
                  </li>
                  <li>
                    <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
                      <MessageCircle size={16} className="footer-icon" />
                      <span>Discord</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer Bottom - Constrained */}
      <div className="footer-bottom-wrapper">
        <div className="footer-container">
          {/* Second Divider - Constrained Width */}
          <div className="footer-divider-constrained"></div>
          
          <div className="footer-bottom">
            <p className="footer-copyright">© Akira All rights reserved. We may collect usage data.</p>
            <div className="footer-legal">
              <a href="#terms">Terms of Service</a>
              <a href="#privacy">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;