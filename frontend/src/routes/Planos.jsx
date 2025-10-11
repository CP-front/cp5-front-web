"use client"

import { useState, useEffect } from "react"
// Supondo que seu 'api' utilitário esteja configurado
import api from "../utils/api"

// Componente para o item do FAQ, para manter o JSX principal mais limpo
const FaqItem = ({ question, answer }) => (
    <details className="bg-gray-900 p-6 rounded-xl border border-gray-800 group transition-all duration-300 hover:border-orange-500/50">
        <summary className="font-bold text-lg text-white cursor-pointer list-none flex items-center justify-between">
            {question}
            <svg className="w-5 h-5 text-orange-500 transform group-open:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
        </summary>
        <p className="text-gray-400 mt-4 leading-relaxed">{answer}</p>
    </details>
);


const Planos = () => {
    const [planos, setPlanos] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPlanos = async () => {
            try {
                const response = await api.get("/planos")
                if (Array.isArray(response.data)) {
                    setPlanos(response.data)
                } else {
                    console.warn("A resposta da API para /planos não é um array.", response.data);
                    setPlanos([]);
                }
            } catch (error) {
                console.error("Erro ao buscar planos:", error)
                setPlanos([])
            } finally {
                setLoading(false)
            }
        }
        fetchPlanos()
    }, [])

    const faqData = [
        { question: "Posso cancelar a qualquer momento?", answer: "Sim! Todos os nossos planos são sem fidelidade. Você pode cancelar quando quiser, sem burocracia." },
        { question: "Há alguma taxa de matrícula ou anuidade?", answer: "Não cobramos taxa de matrícula nem de anuidade. O valor que você vê é o valor que você paga." },
        { question: "Como funciona a mudança de plano?", answer: "É muito simples! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento através do nosso aplicativo ou diretamente na recepção." },
        { question: "Os planos dão acesso a todas as unidades?", answer: "Os planos Falcão Black e Falcão Premium garantem acesso ilimitado a todas as unidades da nossa rede. O plano Falcão Essencial é válido apenas para a unidade de matrícula." },
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-400 text-lg">Carregando planos...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-black text-white">
            {/* Hero Section */}
            <section className="py-20 bg-gray-900/50">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">Escolha Seu Plano</h1>
                    <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-300">
                        Temos planos flexíveis para todos os objetivos e estilos de vida. Encontre o perfeito para você.
                    </p>
                </div>
            </section>

            <hr className="border-gray-800" />

            {/* Seção dos Planos */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
                        {planos.length > 0 ? (
                            planos.map((plano) => (
                                <div
                                    key={plano.id}
                                    className={`bg-gray-900 rounded-2xl p-8 flex flex-col h-full border transition-all duration-300
                                    ${plano.destaque
                                            ? "border-orange-500 border-2 scale-105 shadow-2xl shadow-orange-500/20 relative"
                                            : "border-gray-800 hover:border-orange-500/50 hover:-translate-y-2"
                                        }`}
                                >
                                    {plano.destaque && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-6 py-1 rounded-full text-sm font-bold tracking-wider">
                                            Mais Popular
                                        </div>
                                    )}

                                    <div className="text-center mb-6">
                                        <h3 className="text-2xl font-bold text-white mb-2">{plano.nome}</h3>
                                        <p className="text-gray-400 text-sm mb-4 h-10">{plano.descricao}</p>
                                        <div className="flex items-baseline justify-center gap-1">
                                            <span className="text-gray-400 text-2xl">R$</span>
                                            <span className={`text-5xl font-bold ${plano.destaque ? 'text-orange-500' : 'text-white'}`}>
                                                {plano.preco.toFixed(2).replace(".", ",")}
                                            </span>
                                            <span className="text-gray-400">/mês</span>
                                        </div>
                                    </div>

                                    <ul className="space-y-4 mb-8 flex-grow">
                                        {plano.beneficios.map((beneficio, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <svg className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className="text-gray-300">{beneficio}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <button className={
                                        plano.destaque
                                            ? "w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                                            : "w-full border-2 border-orange-500 text-orange-500 font-bold py-3 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300 cursor-pointer"
                                    }>
                                        Escolher Plano
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="lg:col-span-3 text-center text-gray-400 py-16">
                                <p className="text-xl">Nenhum plano disponível no momento. <br /> Por favor, volte mais tarde.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <hr className="border-gray-800" />

            {/* Seção de FAQ */}
            <section className="py-20 bg-gray-900/50">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">Perguntas Frequentes</h2>
                        <div className="space-y-4">
                            {faqData.map((faq, index) => (
                                <FaqItem key={index} question={faq.question} answer={faq.answer} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Seção de CTA */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="bg-gray-900 border-2 border-orange-500/30 rounded-2xl text-center max-w-3xl mx-auto p-12 shadow-lg shadow-orange-500/10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ainda tem dúvidas?</h2>
                        <p className="text-gray-300 mb-8 text-lg">Nossa equipe está pronta para te ajudar a escolher o melhor plano para sua jornada.</p>
                        <a href="/sobre" className="bg-orange-500 text-white font-bold text-lg px-10 py-3 inline-block rounded-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105">
                            Falar com Consultor
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Planos