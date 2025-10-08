import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.js"
import planosRoutes from "./routes/planos.js"
// import treinosRoutes from "./routes/treinos.js"
import contatoRoutes from "./routes/contato.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/planos", planosRoutes)
// app.use("/api/treinos", treinosRoutes)
app.use("/api/contato", contatoRoutes)

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Academia Falcões API está rodando!" })
})

app.listen(PORT, () => {
  console.log(`🦅 Servidor rodando na porta ${PORT}`)
})
