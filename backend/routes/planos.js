import express from "express"
import { readJSON, writeJSON } from "../utils/fileHandler.js"
import { authenticateToken } from "../middleware/auth.js"

const router = express.Router()

// GET - Listar todos os planos
router.get("/", async (req, res) => {
  try {
    const planos = await readJSON("planos.json")
    res.json(planos)
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar planos" })
  }
})

// GET - Buscar plano por ID
router.get("/:id", async (req, res) => {
  try {
    const planos = await readJSON("planos.json")
    const plano = planos.find((p) => p.id === req.params.id)

    if (!plano) {
      return res.status(404).json({ error: "Plano não encontrado" })
    }

    res.json(plano)
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar plano" })
  }
})

// POST - Criar novo plano (protegido)
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { nome, preco, descricao, beneficios, destaque } = req.body

    if (!nome || !preco || !descricao || !beneficios) {
      return res.status(400).json({ error: "Campos obrigatórios faltando" })
    }

    const planos = await readJSON("planos.json")

    const newPlano = {
      id: Date.now().toString(),
      nome,
      preco: Number.parseFloat(preco),
      descricao,
      beneficios,
      destaque: destaque || false,
    }

    planos.push(newPlano)
    await writeJSON("planos.json", planos)

    res.status(201).json({ message: "Plano criado com sucesso", plano: newPlano })
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar plano" })
  }
})

// PUT - Atualizar plano (protegido)
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const planos = await readJSON("planos.json")
    const index = planos.findIndex((p) => p.id === req.params.id)

    if (index === -1) {
      return res.status(404).json({ error: "Plano não encontrado" })
    }

    const { nome, preco, descricao, beneficios, destaque } = req.body

    planos[index] = {
      ...planos[index],
      nome: nome || planos[index].nome,
      preco: preco ? Number.parseFloat(preco) : planos[index].preco,
      descricao: descricao || planos[index].descricao,
      beneficios: beneficios || planos[index].beneficios,
      destaque: destaque !== undefined ? destaque : planos[index].destaque,
    }

    await writeJSON("planos.json", planos)

    res.json({ message: "Plano atualizado com sucesso", plano: planos[index] })
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar plano" })
  }
})

// DELETE - Deletar plano (protegido)
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const planos = await readJSON("planos.json")
    const filteredPlanos = planos.filter((p) => p.id !== req.params.id)

    if (planos.length === filteredPlanos.length) {
      return res.status(404).json({ error: "Plano não encontrado" })
    }

    await writeJSON("planos.json", filteredPlanos)

    res.json({ message: "Plano deletado com sucesso" })
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar plano" })
  }
})

export default router
