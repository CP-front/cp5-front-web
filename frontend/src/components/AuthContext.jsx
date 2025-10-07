"use client"

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

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
      const response = await axios.get("/api/auth/verify", {
        headers: { Authorization: `Bearer ${token}` },
      })
      setUser(response.data.user)
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      localStorage.removeItem("token")
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, senha) => {
    try {
      const response = await axios.post("/api/auth/login", { email, senha })
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
      const response = await axios.post("/api/auth/cadastro", { nome, email, senha })
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
