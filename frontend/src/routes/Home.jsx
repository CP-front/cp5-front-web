import { Link } from "react-router-dom";
import React from 'react';
import Atleta from '../assets/atleta.jpg';

// Um componente para os ícones, para manter o código principal mais limpo
const FeatureIcon = ({ path }) => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} />
    </svg>
);

const Home = () => {
    // Dados para os cards de estatísticas e features para facilitar a manutenção
    const stats = [
        { number: "5000+", label: "Alunos Ativos" },
        { number: "50+", label: "Professores" },
        { number: "15", label: "Anos de Experiência" },
        { number: "98%", label: "Satisfação" },
    ];

    const features = [
        {
            iconPath: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
            title: "Treinos Inteligentes",
            description: "Nossa IA personaliza seus treinos com base em seus objetivos e evolução contínua.",
        },
        {
            iconPath: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
            title: "Professores Especializados",
            description: "Equipe qualificada e certificada para te guiar em cada etapa da sua jornada fitness.",
        },
        {
            iconPath: "M13 10V3L4 14h7v7l9-11h-7z",
            title: "Equipamentos Premium",
            description: "Tecnologia de ponta e os melhores equipamentos do mercado para maximizar seus resultados.",
        },
    ];

    return (
        <div className="bg-black text-white">
            {/* Hero Section */}
            <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">
                {/* Background com Imagem e Gradiente */}
                <div className="absolute inset-0 z-0">
                    <img src={Atleta} alt="Atleta em treinamento" className="w-full h-full object-cover opacity-20" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                </div>

                {/* Conteúdo */}
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 animate-fade-in-down">
                        Transforme Seu Corpo <br />
                        <span className="text-orange-500">Supere Seus Limites</span>
                    </h1>
                    <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-300 mb-10 animate-fade-in-up">
                        Treinos inteligentes e personalizados com tecnologia de ponta. Junte-se aos Falcões e alcance seus objetivos.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link to="/planos" className="bg-orange-500 text-white font-bold text-lg px-10 py-3 rounded-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105">
                            Ver Planos
                        </Link>
                        <Link to="/treinos" className="border-2 border-orange-500 text-orange-500 font-bold text-lg px-10 py-3 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300">
                            Conhecer Treinos
                        </Link>
                    </div>

                    {/* Estatísticas */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 max-w-4xl mx-auto">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-2">{stat.number}</div>
                                <div className="text-sm uppercase tracking-wider text-gray-400">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <hr className="border-gray-800" />

            {/* Features Section */}
            <section className="py-20 bg-gray-900/50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Por Que Escolher os Falcões?</h2>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">Tecnologia e expertise para resultados que você pode ver e sentir.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-gray-900 p-8 rounded-xl border border-gray-800 text-center group hover:-translate-y-2 transition-transform duration-300">
                                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                                    <FeatureIcon path={feature.iconPath} />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <hr className="border-gray-800" />

            {/* CTA Section */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="bg-gray-900 border-2 border-orange-500/30 rounded-2xl text-center max-w-4xl mx-auto p-12 shadow-lg shadow-orange-500/5">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Pronto Para Começar?</h2>
                        <p className="text-xl text-gray-300 mb-8">Faça parte da família Falcões e transforme sua vida hoje mesmo.</p>
                        <Link to="/planos" className="bg-orange-500 text-white font-bold text-lg px-12 py-4 inline-block rounded-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105">
                            Escolher Meu Plano
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;