"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
// Supondo que você tenha estes componentes criados
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

  // Definição das classes dos botões para reutilização
  const primaryButtonClasses = "bg-orange-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105"
  const secondaryButtonClasses = "border border-orange-500 text-orange-500 font-semibold text-sm px-6 py-2 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300"

  return (
    <>
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              {/* Ícone do Logo */}
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2L3 7v10c0 5.5 3.8 10 9 11.5 5.2-1.5 9-6 9-11.5V7L12 2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 17.75a5.75 5.75 0 100-11.5 5.75 5.75 0 000 11.5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12h.01" />
                </svg>
              </div>
              {/* Nome da Marca */}
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Falcões<span className="text-orange-500">.</span>
                </h1>
                <p className="text-xs text-gray-400 -mt-1 tracking-tight">Academia Inteligente</p>
              </div>
            </Link>

            {/* Navegação Desktop */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-medium transition-colors relative group text-lg ${isActive(link.path) ? "text-orange-500" : "text-gray-300 hover:text-white"
                    }`}
                >
                  {link.name}
                  {/* Animação da linha inferior */}
                  <span
                    className={`absolute -bottom-2 left-0 w-full h-0.5 bg-orange-500 transform origin-left transition-transform duration-300 ${isActive(link.path) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                  />
                </Link>
              ))}
            </div>

            {/* Botões de Autenticação Desktop */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-300">Olá, {user.nome}</span>
                  <button onClick={logout} className={secondaryButtonClasses}>
                    Sair
                  </button>
                </div>
              ) : (
                <button onClick={() => setShowAuthModal(true)} className={primaryButtonClasses}>
                  Entrar
                </button>
              )}
            </div>

            {/* Botão do Menu Mobile */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white p-2 hover:bg-gray-800 rounded-lg transition-colors"
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

          {/* Menu Mobile */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-800 pt-4">
              <div className="flex flex-col gap-4 items-center">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`font-medium transition-colors text-lg py-2 ${isActive(link.path) ? "text-orange-500" : "text-gray-300 hover:text-white"
                      }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <hr className="w-full border-gray-800 my-2" />
                {user ? (
                  <div className="w-full flex flex-col items-center gap-4">
                    <span className="text-sm text-gray-400">Olá, {user.nome}</span>
                    <button onClick={logout} className={`${secondaryButtonClasses} w-full`}>
                      Sair
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setShowAuthModal(true)
                      setIsMenuOpen(false)
                    }}
                    className={`${primaryButtonClasses} w-full`}
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