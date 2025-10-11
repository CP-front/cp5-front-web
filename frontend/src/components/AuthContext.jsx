"use client"

import { createContext, useContext, useState, useEffect } from "react";
import api from "../utils/api"; // Garante que estamos a usar a nossa API configurada

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider")
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
      // Usando a instância 'api' e a rota correta
      const response = await api.get("/auth/verify", {
        headers: { Authorization: `Bearer ${token}` },
      })
      setUser(response.data.user)
    } catch (error) {
      // Se a verificação falhar, limpamos o token inválido
      localStorage.removeItem("token")
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, senha) => {
    try {
      // Usando a instância 'api' e a rota correta
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
      // Usando a instância 'api' e a rota correta
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

  return (
    <AuthContext.Provider value={{ user, loading, login, cadastro, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
