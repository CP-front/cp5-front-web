"use client"

import { useState, useEffect } from "react"
import api from "../utils/api" // Supondo que seu 'api' utilitário esteja configurado
import Academia from '../assets/academia.jpg'
import Academia2 from '../assets/academia2.jpg'
import Academia3 from '../assets/academia3.jpg'

// Componente para os cards de valores
const ValueCard = ({ icon, title, description }) => (
  <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 text-center group hover:-translate-y-2 transition-transform duration-300">
    <div className="w-16 h-16 bg-orange-500/10 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{description}</p>
  </div>
);

// Componente para os cards de informação de contato
const ContactInfoCard = ({ icon, title, children }) => (
  <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center text-orange-500 flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-white mb-1">{title}</h3>
        <p className="text-gray-400 text-sm">{children}</p>
      </div>
    </div>
  </div>
);

const Sobre = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    mensagem: "",
  })
  const [status, setStatus] = useState({ type: "", message: "" })
  const [loading, setLoading] = useState(false)

  // --- NOVO: controle do slideshow de imagens ---
  const [imageIndex, setImageIndex] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev === 0 ? 1 : 0))
    }, 10000) // alterna a cada 10s
    return () => clearInterval(interval)
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus({ type: "", message: "" })

    try {
      const response = await api.post("/contato", formData)
      setStatus({ type: "success", message: response.data.message || "Mensagem enviada com sucesso!" })
      setFormData({ nome: "", email: "", telefone: "", mensagem: "" })
    } catch (error) {
      setStatus({
        type: "error",
        message: error.response?.data?.error || "Erro ao enviar mensagem. Tente novamente.",
      })
    } finally {
      setLoading(false)
    }
  }

  const valuesData = [
    { icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>, title: "Excelência", description: "Buscamos a melhor qualidade em equipamentos, profissionais e atendimento." },
    { icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>, title: "Inovação", description: "Utilizamos tecnologia de ponta para proporcionar treinos mais eficientes e motivadores." },
    { icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>, title: "Comunidade", description: "Criamos um ambiente acolhedor e seguro onde todos se sentem parte da família Falcões." },
  ];

  return (
    <div className="bg-black text-white">
      {/* Hero Sobre */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">Sobre a Academia Falcões</h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-300">
            Há 15 anos transformando vidas através do fitness inteligente e personalizado.
          </p>
        </div>
      </section>

      <hr className="border-gray-800" />

      {/* Nossa História */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            
            {/* Slideshow automático */}
            <div className="relative w-full h-[400px] flex justify-center items-center">
              <img
                src={Academia}
                alt="Interior da Academia Falcões"
                className={`absolute w-full h-full object-cover rounded-2xl shadow-lg shadow-orange-500/10 transition-opacity duration-1000 ${imageIndex === 0 ? "opacity-100" : "opacity-0"}`}
              />
              <img
                src={Academia2}
                alt="Treinamento na Academia Falcões"
                className={`absolute w-full h-full object-cover rounded-2xl shadow-lg shadow-orange-500/10 transition-opacity duration-1000 ${imageIndex === 1 ? "opacity-100" : "opacity-0"}`}
              />
              <img
                src={Academia3}
                alt="Treinamento na Academia Falcões"
                className={`absolute w-full h-full object-cover rounded-2xl shadow-lg shadow-orange-500/10 transition-opacity duration-1000 ${imageIndex === 1 ? "opacity-100" : "opacity-0"}`}
              />
            </div>

            {/* Texto */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-orange-400 text-transparent bg-clip-text">
                CONHEÇA NOSSA HISTÓRIA
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Fundada em 2010, a Academia Falcões nasceu com o propósito de revolucionar o conceito de fitness. Combinamos tecnologia de ponta com a expertise de profissionais altamente qualificados para criar um ecossistema de saúde e bem-estar.
                </p>
                <p>
                  Nossa missão é proporcionar uma experiência de treinamento única, onde cada aluno recebe atenção personalizada e um plano adaptado aos seus objetivos, garantindo resultados reais e sustentáveis.
                </p>
                <p>
                  Com mais de 5.000 alunos ativos, nos orgulhamos de fazer parte da jornada de transformação de cada pessoa que confia em nosso trabalho.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-gray-800" />

      {/* Valores */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">Nossos Valores</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {valuesData.map((value, index) => (
              <ValueCard key={index} icon={value.icon} title={value.title} description={value.description} />
            ))}
          </div>
        </div>
      </section>

      <hr className="border-gray-800" />

      {/* Contato */}
      <section id="contato" className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Entre em Contato</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">Tem alguma dúvida ou quer agendar uma visita? Fale conosco!</p>
            </div>

            <div className="grid md:grid-cols-2 gap-10 items-start">
              {/* Informações de Contato */}
              <div className="space-y-6 mt-2">
                <ContactInfoCard title="Endereço" icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}>
                  Av. Paulista, 1000 - São Paulo, SP
                </ContactInfoCard>
                <ContactInfoCard title="Telefone" icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>}>
                  (11) 99999-9999
                </ContactInfoCard>
                <ContactInfoCard title="Email" icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}>
                  contato@falcoes.com
                </ContactInfoCard>
              </div>

              {/* Formulário */}
              <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 rounded-2xl p-8 space-y-4">
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium mb-2 text-gray-300">Nome</label>
                  <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">Email</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors" />
                </div>
                <div>
                  <label htmlFor="telefone" className="block text-sm font-medium mb-2 text-gray-300">Telefone</label>
                  <input type="tel" id="telefone" name="telefone" value={formData.telefone} onChange={handleChange} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors" />
                </div>
                <div>
                  <label htmlFor="mensagem" className="block text-sm font-medium mb-2 text-gray-300">Mensagem</label>
                  <textarea id="mensagem" name="mensagem" value={formData.mensagem} onChange={handleChange} required rows={4} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors resize-none" />
                </div>
                {status.message && (
                  <div className={`p-4 rounded-lg text-sm ${status.type === "success" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
                    {status.message}
                  </div>
                )}
                <button type="submit" disabled={loading} className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition-all duration-300 disabled:bg-orange-800 disabled:cursor-not-allowed">
                  {loading ? "Enviando..." : "Enviar Mensagem"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Sobre
