"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "./AuthContext"
import AuthModal from "./AuthModal"
  

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const location = useLocation()
  const { user, logout } = useAuth()

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Planos", path: "/planos" },
    { name: "Treinos", path: "/treinos" },
    { name: "Sobre", path: "/sobre" },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <>
      <header className="sticky top-0 z-50 bg-dark/95 backdrop-blur-sm border-b border-gray-800">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform">
                <svg
                  className="w-7 h-7 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Falcões<span className="text-primary">.</span>
                </h1>
                <p className="text-xs text-gray-400 -mt-1">Academia Inteligente</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-medium transition-colors relative group ${
                    isActive(link.path) ? "text-primary" : "text-gray-300 hover:text-white"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-1 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform ${
                      isActive(link.path) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              ))}
            </div>

            {/* Auth Button */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-300">Olá, {user.nome}</span>
                  <button onClick={logout} className="btn-secondary text-sm px-6 py-2">
                    Sair
                  </button>
                </div>
              ) : (
                <button onClick={() => setShowAuthModal(true)} className="btn-primary">
                  Entrar
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white p-2 hover:bg-dark-lighter rounded-lg transition-colors"
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-800 pt-4">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`font-medium transition-colors ${
                      isActive(link.path) ? "text-primary" : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                {user ? (
                  <>
                    <span className="text-sm text-gray-400">Olá, {user.nome}</span>
                    <button onClick={logout} className="btn-secondary w-full">
                      Sair
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setShowAuthModal(true)
                      setIsMenuOpen(false)
                    }}
                    className="btn-primary w-full"
                  >
                    Entrar
                  </button>
                )}
              </div>
            </div>
          )}
        </nav>
      </header>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  )
}

export default Header
