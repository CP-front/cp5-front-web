import { Link } from "react-router-dom"
import React from 'react'
import Confuso from '../assets/confuso.jpg';


const Error = () => {
  // Definindo as classes dos botões para manter a consistência
  const primaryButtonClasses = "bg-orange-500 text-white font-bold px-8 py-3 rounded-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105"
  const secondaryButtonClasses = "border-2 border-orange-500 text-orange-500 font-bold px-8 py-3 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300"

  return (
    <div className="bg-black text-white min-h-[100vh] flex items-center justify-center">
      <div className="text-center px-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-8xl md:text-9xl font-extrabold text-orange-500 tracking-wider mb-4">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Página Não Encontrada
          </h2>
          <p className="text-lg md:text-xl text-gray-400 mb-10">
            Ops! Parece que você se perdeu no caminho para o treino.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className={primaryButtonClasses}>
            Voltar para Home
          </Link>
          <Link to="/planos" className={secondaryButtonClasses}>
            Ver Planos
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Error