import express from "express"
import { readJSON, writeJSON } from "../utils/fileHandler.js"
import { authenticateToken } from "../middleware/auth.js"

const router = express.Router()

// GET - Listar todos os treinos
router.get("/", async (req, res) => {
  try {
    const treinos = await readJSON("treinos.json")
    res.json(treinos)
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar treinos" })
  }
})

// GET - Buscar treino por ID
router.get("/:id", async (req, res) => {
  try {
    const treinos = await readJSON("treinos.json")
    const treino = treinos.find((t) => t.id === req.params.id)

    if (!treino) {
      return res.status(404).json({ error: "Treino não encontrado" })
    }

    res.json(treino)
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar treino" })
  }
})

// POST - Criar novo treino (protegido)
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { nome, categoria, nivel, duracao, descricao, exercicios, imagem } = req.body

    if (!nome || !categoria || !nivel || !duracao || !descricao || !exercicios) {
      return res.status(400).json({ error: "Campos obrigatórios faltando" })
    }

    const treinos = await readJSON("treinos.json")

    const newTreino = {
      id: Date.now().toString(),
      nome,
      categoria,
      nivel,
      duracao,
      descricao,
      exercicios,
      imagem: imagem || "/placeholder.svg?height=400&width=600",
    }

    treinos.push(newTreino)
    await writeJSON("treinos.json", treinos)

    res.status(201).json({ message: "Treino criado com sucesso", treino: newTreino })
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar treino" })
  }
})

// PUT - Atualizar treino (protegido)
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const treinos = await readJSON("treinos.json")
    const index = treinos.findIndex((t) => t.id === req.params.id)

    if (index === -1) {
      return res.status(404).json({ error: "Treino não encontrado" })
    }

    const { nome, categoria, nivel, duracao, descricao, exercicios, imagem } = req.body

    treinos[index] = {
      ...treinos[index],
      nome: nome || treinos[index].nome,
      categoria: categoria || treinos[index].categoria,
      nivel: nivel || treinos[index].nivel,
      duracao: duracao || treinos[index].duracao,
      descricao: descricao || treinos[index].descricao,
      exercicios: exercicios || treinos[index].exercicios,
      imagem: imagem || treinos[index].imagem,
    }

    await writeJSON("treinos.json", treinos)

    res.json({ message: "Treino atualizado com sucesso", treino: treinos[index] })
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar treino" })
  }
})

// DELETE - Deletar treino (protegido)
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const treinos = await readJSON("treinos.json")
    const filteredTreinos = treinos.filter((t) => t.id !== req.params.id)

    if (treinos.length === filteredTreinos.length) {
      return res.status(404).json({ error: "Treino não encontrado" })
    }

    await writeJSON("treinos.json", filteredTreinos)

    res.json({ message: "Treino deletado com sucesso" })
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar treino" })
  }
})

export default router
