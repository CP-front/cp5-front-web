import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { readJSON, writeJSON } from "../utils/fileHandler.js"

const router = express.Router()

// Cadastro
router.post("/cadastro", async (req, res) => {
  try {
    const { nome, email, senha } = req.body

    if (!nome || !email || !senha) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios" })
    }

    const users = await readJSON("users.json")

    const userExists = users.find((u) => u.email === email)
    if (userExists) {
      return res.status(400).json({ error: "Email já cadastrado" })
    }

    const hashedPassword = await bcrypt.hash(senha, 10)

    const newUser = {
      id: Date.now().toString(),
      nome,
      email,
      senha: hashedPassword,
      criadoEm: new Date().toISOString(),
    }

    users.push(newUser)
    await writeJSON("users.json", users)

    const token = jwt.sign({ id: newUser.id, email: newUser.email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    })

    res.status(201).json({
      message: "Usuário cadastrado com sucesso",
      token,
      user: {
        id: newUser.id,
        nome: newUser.nome,
        email: newUser.email,
      },
    })
  } catch (error) {
    res.status(500).json({ error: "Erro ao cadastrar usuário" })
  }
})

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body

    if (!email || !senha) {
      return res.status(400).json({ error: "Email e senha são obrigatórios" })
    }

    const users = await readJSON("users.json")
    const user = users.find((u) => u.email === email)

    if (!user) {
      return res.status(401).json({ error: "Credenciais inválidas" })
    }

    const isValidPassword = await bcrypt.compare(senha, user.senha)
    if (!isValidPassword) {
      return res.status(401).json({ error: "Credenciais inválidas" })
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    })

    res.json({
      message: "Login realizado com sucesso",
      token,
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
      },
    })
  } catch (error) {
    res.status(500).json({ error: "Erro ao fazer login" })
  }
})

// Verificar token
router.get("/verify", async (req, res) => {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({ error: "Token não fornecido" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const users = await readJSON("users.json")
    const user = users.find((u) => u.id === decoded.id)

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" })
    }

    res.json({
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
      },
    })
  } catch (error) {
    res.status(403).json({ error: "Token inválido" })
  }
})

export default router
