import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { readJSON, writeJSON } from "../utils/fileHandler.js"
// ALTERAÇÃO: Importamos o middleware de autenticação
import { authenticateToken } from "../middleware/auth.js"

const router = express.Router()

// ROTA DE REGISTO: POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { nome, email, senha } = req.body
    if (!nome || !email || !senha) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios" })
    }

    const usuarios = await readJSON("usuario.json")
    const emailExists = usuarios.find((user) => user.email === email)
    if (emailExists) {
      return res.status(400).json({ error: "Este email já está em uso" })
    }

    const salt = await bcrypt.genSalt(10)
    const senhaHash = await bcrypt.hash(senha, salt)

    const newUser = {
      id: Date.now().toString(),
      nome,
      email,
      senha: senhaHash,
    }

    usuarios.push(newUser)
    await writeJSON("usuario.json", usuarios)

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "8h",
    })

    res.status(201).json({
      message: "Utilizador criado com sucesso",
      token,
      user: { id: newUser.id, nome: newUser.nome, email: newUser.email },
    })
  } catch (error) {
    console.error("ERRO NO REGISTO:", error)
    res.status(500).json({ error: "Erro interno do servidor ao registar" })
  }
})

// ROTA DE LOGIN: POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body
    if (!email || !senha) {
      return res.status(400).json({ error: "Email e senha são obrigatórios" })
    }

    const usuarios = await readJSON("usuario.json")
    const user = usuarios.find((u) => u.email === email)
    if (!user) {
      return res.status(404).json({ error: "Utilizador não encontrado" })
    }

    const isMatch = await bcrypt.compare(senha, user.senha)
    if (!isMatch) {
      return res.status(401).json({ error: "Credenciais inválidas" })
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "8h",
    })

    res.json({
      message: "Login bem-sucedido",
      token,
      user: { id: user.id, nome: user.nome, email: user.email },
    })
  } catch (error) {
    console.error("ERRO NO LOGIN:", error)
    res.status(500).json({ error: "Erro interno do servidor ao fazer login" })
  }
})

// ALTERAÇÃO: Nova rota para verificar o token
router.get("/verify", authenticateToken, async (req, res) => {
  try {
    // Se o código chegou aqui, o token é válido.
    // O middleware já colocou o id do utilizador em req.user
    const usuarios = await readJSON("usuario.json")
    const user = usuarios.find((u) => u.id === req.user.id)

    if (!user) {
      return res.status(404).json({ error: "Utilizador associado ao token não encontrado" })
    }

    res.json({
      message: "Token válido",
      user: { id: user.id, nome: user.nome, email: user.email },
    })
  } catch (error) {
    console.error("ERRO NA VERIFICAÇÃO:", error)
    res.status(500).json({ error: "Erro interno do servidor ao verificar token" })
  }
})

export default router

