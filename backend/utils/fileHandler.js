import fs from "fs/promises"
import path from "path"
import { fileURLToPath } from "url"

// Encontra o diretório do arquivo atual (utils)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Constrói o caminho para a pasta 'data' de forma mais segura,
// subindo um nível a partir de 'utils'
const dataDirectory = path.join(__dirname, "..", "data")

export const readJSON = async (filename) => {
  // Cria o caminho completo para o arquivo JSON
  const filePath = path.join(dataDirectory, filename)

  // Adicionamos este log para depuração. Ele mostrará o caminho exato no terminal do backend.
  console.log(`[FileHandler] Tentando ler o arquivo em: ${filePath}`)

  try {
    const data = await fs.readFile(filePath, "utf-8")
    console.log(`[FileHandler] Arquivo ${filename} lido com sucesso.`)
    return JSON.parse(data)
  } catch (error) {
    // Este erro aparecerá no terminal do seu backend se algo der errado
    console.error(`[FileHandler] ERRO: Não foi possível ler o arquivo em ${filePath}. Verifique se o caminho está correto e o arquivo existe.`, error)
    // Retorna um array vazio para não quebrar a aplicação no frontend
    return []
  }
}

export const writeJSON = async (filename, data) => {
  const filePath = path.join(dataDirectory, filename)
  
  console.log(`[FileHandler] Tentando escrever no arquivo em: ${filePath}`)

  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8")
    console.log(`[FileHandler] Arquivo ${filename} escrito com sucesso.`)
    return true
  } catch (error) {
    console.error(`[FileHandler] ERRO: Não foi possível escrever no arquivo em ${filePath}.`, error)
    return false
  }
}
