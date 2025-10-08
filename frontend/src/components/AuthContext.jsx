"use client"

import { createContext, useContext, useState, useEffect } from "react";
// ALTERAÇÃO: Importei o seu `api.js` configurado para garantir que a baseURL está correta.
import api from "../utils/api"; 

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      verifyToken(token)
    } else {
      setLoading(false)
    }
  }, [])

  const verifyToken = async (token) => {
    try {
      // Usando a instância `api`
      const response = await api.get("/auth/verify", {
        headers: { Authorization: `Bearer ${token}` },
      })
      setUser(response.data.user)
    } catch (error) {
      localStorage.removeItem("token")
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, senha) => {
    try {
      // Usando a instância `api`
      const response = await api.post("/auth/login", { email, senha })
      localStorage.setItem("token", response.data.token)
      setUser(response.data.user)
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Erro ao fazer login",
      }
    }
  }

  const cadastro = async (nome, email, senha) => {
    try {
      // ALTERAÇÃO AQUI: Mudei a rota de "/api/auth/cadastro" para "/auth/register".
      // E agora usando a instância `api` que já tem a baseURL configurada.
      const response = await api.post("/auth/register", { nome, email, senha })
      localStorage.setItem("token", response.data.token)
      setUser(response.data.user)
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Erro ao cadastrar",
      }
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, loading, login, cadastro, logout }}>{children}</AuthContext.Provider>
}

export default AuthContext
