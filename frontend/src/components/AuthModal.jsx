"use client"

import { useState } from "react"
import { useAuth } from "./AuthContext"

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
      let result
      if (isLogin) {
        result = await login(formData.email, formData.senha)
      } else {
        result = await cadastro(formData.nome, formData.email, formData.senha)
      }

      if (result.success) {
        onClose()
        setFormData({ nome: "", email: "", senha: "", confirmarSenha: "" })
      } else {
        setError(result.error)
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError("Erro ao processar requisição")
    } finally {
      setLoading(false)
    }
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    setError("")
    setFormData({ nome: "", email: "", senha: "", confirmarSenha: "" })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-dark-lighter rounded-2xl max-w-md w-full border border-gray-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/20 to-primary/5 p-6 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{isLogin ? "Bem-vindo de volta!" : "Junte-se aos Falcões"}</h2>
              <p className="text-gray-400 text-sm mt-1">
                {isLogin ? "Entre para continuar" : "Crie sua conta gratuitamente"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-dark hover:bg-dark-light rounded-full flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            {!isLogin && (
              <div>
                <label htmlFor="nome" className="block text-sm font-medium mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required={!isLogin}
                  className="w-full bg-dark border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                  placeholder="Seu nome"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-dark border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label htmlFor="senha" className="block text-sm font-medium mb-2">
                Senha
              </label>
              <input
                type="password"
                id="senha"
                name="senha"
                value={formData.senha}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full bg-dark border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                placeholder="Mínimo 6 caracteres"
              />
            </div>

            {!isLogin && (
              <div>
                <label htmlFor="confirmarSenha" className="block text-sm font-medium mb-2">
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  id="confirmarSenha"
                  name="confirmarSenha"
                  value={formData.confirmarSenha}
                  onChange={handleChange}
                  required={!isLogin}
                  minLength={6}
                  className="w-full bg-dark border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                  placeholder="Confirme sua senha"
                />
              </div>
            )}

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processando...
                </span>
              ) : isLogin ? (
                "Entrar"
              ) : (
                "Criar Conta"
              )}
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 pb-6 text-center">
          <p className="text-gray-400 text-sm">
            {isLogin ? "Ainda não tem uma conta?" : "Já tem uma conta?"}{" "}
            <button onClick={toggleMode} className="text-primary font-medium hover:underline">
              {isLogin ? "Cadastre-se" : "Faça login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default AuthModal
