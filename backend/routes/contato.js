import express from "express"

const router = express.Router()

// POST - Enviar mensagem de contato
router.post("/", async (req, res) => {
  try {
    const { nome, email, telefone, mensagem } = req.body

    if (!nome || !email || !mensagem) {
      return res.status(400).json({ error: "Nome, email e mensagem são obrigatórios" })
    }

    // Aqui você poderia salvar em um arquivo ou enviar email
    console.log("Nova mensagem de contato:", { nome, email, telefone, mensagem })

    res.status(200).json({
      message: "Mensagem enviada com sucesso! Entraremos em contato em breve.",
    })
  } catch (error) {
    res.status(500).json({ error: "Erro ao enviar mensagem" })
  }
})

export default router
