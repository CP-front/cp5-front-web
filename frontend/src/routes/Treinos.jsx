"use client"

import { useState, useEffect } from "react"
import api from "../utils/api"
import { useAuth } from "../components/AuthContext"
import { Link } from "react-router-dom"

const Treinos = () => {
  const { user } = useAuth()
  const [treinos, setTreinos] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtroCategoria, setFiltroCategoria] = useState("Todos")
  const [treinoSelecionado, setTreinoSelecionado] = useState(null)
  const [modalFormAberto, setModalFormAberto] = useState(false)
  const [modoEdicao, setModoEdicao] = useState(false)
  const [formData, setFormData] = useState({ nome: "", categoria: "", nivel: "", duracao: "", descricao: "", exercicios: [], imagem: "" })
  const [exercicioInput, setExercicioInput] = useState("")

  // Efeito para travar o scroll da página quando um modal estiver aberto
  useEffect(() => {
    document.body.style.overflow = treinoSelecionado || modalFormAberto ? 'hidden' : 'unset'
  }, [treinoSelecionado, modalFormAberto]);

  // Lógica do Componente (sem alterações)
  useEffect(() => { fetchTreinos() }, [])

  const fetchTreinos = async () => {
    try {
      const response = await api.get("/treinos")
      setTreinos(Array.isArray(response.data) ? response.data : [])
    } catch (error) {
      console.error("Erro ao buscar treinos:", error)
      setTreinos([])
    } finally {
      setLoading(false)
    }
  }

  const categorias = ["Todos", ...new Set(treinos.map((t) => t.categoria))]
  const treinosFiltrados = filtroCategoria === "Todos" ? treinos : treinos.filter((t) => t.categoria === filtroCategoria)

  const getNivelColor = (nivel) => {
    switch (nivel?.toLowerCase()) {
      case "iniciante": return "bg-green-500/10 text-green-400"
      case "intermediário": return "bg-yellow-500/10 text-yellow-400"
      case "avançado": return "bg-red-500/10 text-red-400"
      default: return "bg-gray-500/10 text-gray-400"
    }
  }

  const abrirModalCriar = () => {
    setModoEdicao(false); setFormData({ nome: "", categoria: "", nivel: "", duracao: "", descricao: "", exercicios: [], imagem: "" }); setExercicioInput(""); setModalFormAberto(true)
  }
  const abrirModalEditar = (treino) => {
    setModoEdicao(true); setFormData({ ...treino }); setExercicioInput(""); setModalFormAberto(true)
  }
  const handleInputChange = (e) => { setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value })) }
  const adicionarExercicio = () => { if (exercicioInput.trim()) { setFormData((prev) => ({ ...prev, exercicios: [...prev.exercicios, exercicioInput.trim()] })); setExercicioInput("") } }
  const removerExercicio = (index) => { setFormData((prev) => ({ ...prev, exercicios: prev.exercicios.filter((_, i) => i !== index) })) }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = ["nome", "categoria", "nivel", "duracao", "descricao"];
    if (requiredFields.some(field => !formData[field])) { alert("Preencha todos os campos obrigatórios (*)"); return; }
    if (formData.exercicios.length === 0) { alert("Adicione pelo menos um exercício"); return; }

    try {
      const token = localStorage.getItem("token")
      const config = { headers: { Authorization: `Bearer ${token}` } };
      if (modoEdicao) {
        await api.put(`/treinos/${formData.id}`, formData, config)
      } else {
        await api.post("/treinos", formData, config)
      }
      setModalFormAberto(false); fetchTreinos()
    } catch (error) { console.error("Erro:", error); alert(error.response?.data?.error || "Erro ao salvar") }
  }

  const handleDelete = async (id) => {
    if (!confirm("Tem certeza que deseja excluir este treino?")) return;
    try {
      const token = localStorage.getItem("token")
      await api.delete(`/treinos/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      fetchTreinos(); setTreinoSelecionado(null)
    } catch (error) { console.error("Erro:", error); alert(error.response?.data?.error || "Erro ao excluir") }
  }

  // Classes de Estilo Reutilizáveis
  const inputClasses = "w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
  const primaryButtonClasses = "bg-orange-500 text-white font-bold px-6 py-3 rounded-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105"
  const secondaryButtonClasses = "bg-gray-700 text-gray-200 font-bold px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"

  if (loading) return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center"><div className="text-center"><div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" /><p className="text-gray-400 text-lg">Carregando treinos...</p></div></div>
  )

  return (
    <div className="bg-black text-white">
      {/* Hero */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">Explore Nossos Treinos</h1>
              <p className="max-w-3xl text-lg md:text-xl text-gray-300">Programas desenvolvidos por especialistas para todos os níveis e objetivos.</p>
            </div>
            {user && (
              <button onClick={abrirModalCriar} className={`${primaryButtonClasses} flex items-center gap-2 flex-shrink-0`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                Criar Treino
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Filtros */}
      <section className="py-4 sticky top-[72px] z-40 bg-black/80 backdrop-blur-sm border-y border-gray-800">
        <div className="container mx-auto px-6"><div className="flex flex-wrap gap-3 justify-center">
          {categorias.map((categoria) => (
            <button key={categoria} onClick={() => setFiltroCategoria(categoria)} className={`px-5 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${filtroCategoria === categoria ? "bg-orange-500 text-white shadow-md shadow-orange-500/20" : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"}`}>
              {categoria}
            </button>
          ))}
        </div></div>
      </section>

      {/* Grid de Treinos */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {treinosFiltrados.map((treino) => (
              <div key={treino.id} className="bg-gray-900 border border-gray-800 rounded-2xl flex flex-col group hover:border-orange-500/50 hover:-translate-y-2 transition-all duration-300">
                <div className="relative overflow-hidden rounded-t-2xl">
                  <img src={treino.imagem || "/images/placeholder.svg"} alt={treino.nome} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer" onClick={() => setTreinoSelecionado(treino)} />
                  <div className="absolute top-3 right-3"><span className={`px-3 py-1 rounded-full text-xs font-bold ${getNivelColor(treino.nivel)}`}>{treino.nivel}</span></div>
                  {user && (
                    <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button onClick={(e) => { e.stopPropagation(); abrirModalEditar(treino) }} className="w-9 h-9 bg-orange-500 text-white hover:bg-orange-600 rounded-full flex items-center justify-center transition-colors" aria-label="Editar Treino"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
                      <button onClick={(e) => { e.stopPropagation(); handleDelete(treino.id) }} className="w-9 h-9 bg-red-600 text-white hover:bg-red-700 rounded-full flex items-center justify-center transition-colors" aria-label="Excluir Treino"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow cursor-pointer" onClick={() => setTreinoSelecionado(treino)}>
                  <div className="flex items-center gap-3 mb-3"><span className="px-3 py-1 bg-orange-500/10 text-orange-500 text-xs font-semibold rounded-full">{treino.categoria}</span><span className="text-gray-400 text-sm flex items-center gap-1.5"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>{treino.duracao}</span></div>
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-orange-500 transition-colors">{treino.nome}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-grow">{treino.descricao}</p>
                  <span className="mt-auto text-orange-500 font-semibold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">Ver Detalhes<svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" /></svg></span>
                </div>
              </div>
            ))}
          </div>
          {treinosFiltrados.length === 0 && (<div className="text-center py-20"><p className="text-gray-400 text-lg">Nenhum treino encontrado nesta categoria.</p></div>)}
        </div>
      </section>

      {/* Modal de Detalhes do Treino */}
      {treinoSelecionado && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={() => setTreinoSelecionado(null)}>
          <div className="bg-gray-900 rounded-2xl max-w-2xl w-full my-8 border border-gray-800 shadow-2xl shadow-orange-500/10 animate-fade-in-down" onClick={(e) => e.stopPropagation()}>
            <div className="relative"><img src={treinoSelecionado.imagem || "/images/placeholder.svg"} alt={treinoSelecionado.nome} className="w-full h-64 object-cover rounded-t-2xl" /><button onClick={() => setTreinoSelecionado(null)} className="absolute top-4 right-4 w-10 h-10 bg-black/50 text-white hover:bg-black rounded-full flex items-center justify-center transition-colors" aria-label="Fechar modal"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button></div>
            <div className="p-8"><div className="flex flex-wrap items-center gap-3 mb-4"><span className="px-4 py-1 bg-orange-500/10 text-orange-500 text-sm font-semibold rounded-full">{treinoSelecionado.categoria}</span><span className={`px-4 py-1 text-sm font-semibold rounded-full ${getNivelColor(treinoSelecionado.nivel)}`}>{treinoSelecionado.nivel}</span><span className="text-gray-400 text-sm flex items-center gap-1.5"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>{treinoSelecionado.duracao}</span></div><h2 className="text-3xl font-bold mb-4 text-white">{treinoSelecionado.nome}</h2><p className="text-gray-300 leading-relaxed mb-6">{treinoSelecionado.descricao}</p><div className="border-t border-gray-800 pt-6"><h3 className="text-xl font-bold mb-4 text-white">Exercícios</h3><ul className="space-y-4"> {treinoSelecionado.exercicios.map((exercicio, index) => (<li key={index} className="flex items-start gap-4"><div className="w-8 h-8 bg-orange-500/10 text-orange-500 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">{index + 1}</div><span className="text-gray-300 pt-1">{exercicio}</span></li>))}</ul></div>
              {user ? (<div className="flex gap-4 mt-8"><button onClick={() => { setTreinoSelecionado(null); abrirModalEditar(treinoSelecionado) }} className={`${primaryButtonClasses} flex-1 flex items-center justify-center gap-2`}><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>Editar</button><button onClick={() => handleDelete(treinoSelecionado.id)} className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>Excluir</button></div>) : (<button className={`${primaryButtonClasses} w-full mt-8`}>Adicionar aos Meus Treinos</button>)}
            </div>
          </div>
        </div>
      )}

      {/* Modal de Criar/Editar Treino */}
      {modalFormAberto && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4 overflow-y-auto" onClick={() => setModalFormAberto(false)}>
          <div className="bg-gray-900 rounded-2xl max-w-2xl w-full my-8 border border-gray-800 shadow-2xl shadow-orange-500/10 animate-fade-in-down" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 md:p-8"><div className="flex items-center justify-between mb-6"><h2 className="text-2xl font-bold text-white">{modoEdicao ? "Editar Treino" : "Criar Novo Treino"}</h2><button onClick={() => setModalFormAberto(false)} className="w-10 h-10 bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white rounded-full flex items-center justify-center transition-colors" aria-label="Fechar modal"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button></div>
              <form onSubmit={handleSubmit} className="space-y-4 max-h-[75vh] overflow-y-auto pr-2">
                <div><label className="block text-sm font-medium mb-2 text-gray-300">Nome do Treino <span className="text-orange-500">*</span></label><input type="text" name="nome" value={formData.nome} onChange={handleInputChange} className={inputClasses} placeholder="Ex: Treino de Força" required /></div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium mb-2 text-gray-300">Categoria <span className="text-orange-500">*</span></label><select name="categoria" value={formData.categoria} onChange={handleInputChange} className={inputClasses} required><option value="">Selecione...</option><option value="Musculação">Musculação</option><option value="Cardio">Cardio</option><option value="Funcional">Funcional</option><option value="HIIT">HIIT</option><option value="Yoga">Yoga</option><option value="Crossfit">Crossfit</option></select></div>
                  <div><label className="block text-sm font-medium mb-2 text-gray-300">Nível <span className="text-orange-500">*</span></label><select name="nivel" value={formData.nivel} onChange={handleInputChange} className={inputClasses} required><option value="">Selecione...</option><option value="Iniciante">Iniciante</option><option value="Intermediário">Intermediário</option><option value="Avançado">Avançado</option></select></div>
                </div>
                <div><label className="block text-sm font-medium mb-2 text-gray-300">Duração <span className="text-orange-500">*</span></label><input type="text" name="duracao" value={formData.duracao} onChange={handleInputChange} className={inputClasses} placeholder="Ex: 45 min" required /></div>
                <div><label className="block text-sm font-medium mb-2 text-gray-300">Descrição <span className="text-orange-500">*</span></label><textarea name="descricao" value={formData.descricao} onChange={handleInputChange} rows={3} className={`${inputClasses} resize-none`} placeholder="Descreva o treino..." required /></div>
                <div><label className="block text-sm font-medium mb-2 text-gray-300">URL da Imagem</label><input type="text" name="imagem" value={formData.imagem} onChange={handleInputChange} className={inputClasses} placeholder="https://exemplo.com/imagem.jpg" /></div>
                <div><label className="block text-sm font-medium mb-2 text-gray-300">Exercícios <span className="text-orange-500">*</span></label><div className="flex gap-2 mb-3"><input type="text" value={exercicioInput} onChange={(e) => setExercicioInput(e.target.value)} onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), adicionarExercicio())} className={inputClasses} placeholder="Digite um exercício e clique em Adicionar" /><button type="button" onClick={adicionarExercicio} className={`${primaryButtonClasses} px-5`}>Adicionar</button></div>
                  {formData.exercicios.length > 0 && (<ul className="space-y-2 mt-4">{formData.exercicios.map((exercicio, index) => (<li key={index} className="flex items-center justify-between bg-gray-800 p-3 rounded-lg border border-gray-700"><span className="text-gray-300">{exercicio}</span><button type="button" onClick={() => removerExercicio(index)} className="text-red-500 hover:text-red-400 transition-colors" aria-label="Remover exercício"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button></li>))}</ul>)}
                </div>
                <div className="flex gap-4 pt-4"><button type="button" onClick={() => setModalFormAberto(false)} className={`${secondaryButtonClasses} flex-1`}>Cancelar</button><button type="submit" className={`${primaryButtonClasses} flex-1`}>{modoEdicao ? "Atualizar Treino" : "Criar Treino"}</button></div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* CTA Final */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-6">
          <div className="bg-gray-900 border-2 border-orange-500/30 rounded-2xl text-center max-w-3xl mx-auto p-12 shadow-lg shadow-orange-500/10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pronto para começar?</h2>
            <p className="text-gray-300 mb-8 text-lg">Escolha seu plano e tenha acesso a todos os treinos e acompanhamento profissional.</p>
            <Link to="/planos" className="bg-orange-500 text-white font-bold text-lg px-10 py-3 inline-block rounded-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105">Ver Planos</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Treinos