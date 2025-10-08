"use client"

import { useState, useEffect } from "react"
import { useAuth } from "./AuthContext" // Supondo que seu AuthContext esteja neste caminho

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const { login, cadastro } = useAuth()

  // Reseta o formulário quando o modal é fechado ou o modo é trocado
  useEffect(() => {
    setError("")
    setFormData({ nome: "", email: "", senha: "", confirmarSenha: "" })
  }, [isOpen, isLogin])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (!isLogin && formData.senha !== formData.confirmarSenha) {
      setError("As senhas não coincidem")
      setLoading(false)
      return
    }

    try {
      const result = isLogin
        ? await login(formData.email, formData.senha)
        : await cadastro(formData.nome, formData.email, formData.senha)

      if (result.success) {
        onClose()
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError("Ocorreu um erro. Por favor, tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
  }

  if (!isOpen) return null

  // Estilos reutilizáveis para os inputs e botão
  const inputClasses = "w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
  const buttonClasses = "w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition-all duration-300 disabled:bg-orange-800 disabled:cursor-not-allowed flex items-center justify-center"

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 rounded-2xl max-w-md w-full border border-gray-800 shadow-2xl shadow-orange-500/10 overflow-hidden animate-fade-in-down"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho do Modal */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">{isLogin ? "Bem-vindo de volta!" : "Junte-se aos Falcões"}</h2>
              <p className="text-gray-400 text-sm mt-1">
                {isLogin ? "Faça login para continuar" : "Crie sua conta gratuitamente"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white rounded-full flex items-center justify-center transition-colors"
              aria-label="Fechar modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            {!isLogin && (
              <div>
                <label htmlFor="nome" className="block text-sm font-medium mb-2 text-gray-300">Nome Completo</label>
                <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required={!isLogin} className={inputClasses} placeholder="Seu nome" />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className={inputClasses} placeholder="seu@email.com" />
            </div>

            <div>
              <label htmlFor="senha" className="block text-sm font-medium mb-2 text-gray-300">Senha</label>
              <input type="password" id="senha" name="senha" value={formData.senha} onChange={handleChange} required minLength={6} className={inputClasses} placeholder="Mínimo 6 caracteres" />
            </div>

            {!isLogin && (
              <div>
                <label htmlFor="confirmarSenha" className="block text-sm font-medium mb-2 text-gray-300">Confirmar Senha</label>
                <input type="password" id="confirmarSenha" name="confirmarSenha" value={formData.confirmarSenha} onChange={handleChange} required={!isLogin} minLength={6} className={inputClasses} placeholder="Confirme sua senha" />
              </div>
            )}

            {error && (
              <div className="bg-red-500/10 text-red-400 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} className={buttonClasses}>
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Processando...
                </>
              ) : (isLogin ? "Entrar" : "Criar Conta")}
            </button>
          </div>
        </form>

        {/* Rodapé do Modal */}
        <div className="bg-gray-900/50 px-6 py-4 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm">
            {isLogin ? "Ainda não tem uma conta?" : "Já tem uma conta?"}{" "}
            <button onClick={toggleMode} className="text-orange-500 font-medium hover:underline focus:outline-none">
              {isLogin ? "Cadastre-se" : "Faça login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default AuthModal