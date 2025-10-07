import React from "react";
import { Calendar } from "lucide-react"; // Importa o ícone de calendário

export default function Planos() {
  const planos = [
    {
      id: 1,
      meses: "1 mês",
      valor: "R$ 180,00",
      taxa: "R$ 60,00",
      titulo: "PLANO FIDELIDADE MENSAL",
    },
    {
      id: 3,
      meses: "3 meses",
      valor: "R$ 160,00",
      taxa: "R$ 60,00",
      titulo: "PLANO FIDELIDADE TRIMESTRAL",
    },
    {
      id: 6,
      meses: "6 meses",
      valor: "R$ 150,00",
      taxa: "R$ 60,00",
      titulo: "PLANO FIDELIDADE SEMESTRAL",
    },
    {
      id: 12,
      meses: "12 meses",
      valor: "R$ 120,00",
      taxa: "R$ 60,00",
      titulo: "PLANO FIDELIDADE ANUAL",
    },
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white flex flex-col items-center py-12 px-4">
      <h1 className="text-4xl font-bold mb-2">
        PLANOS <span className="text-orange-500">FALCÕES</span>
      </h1>

      <div className="w-full max-w-3xl space-y-6 mt-8">
        {planos.map((plano) => (
          <div
            key={plano.id}
            className="flex bg-white text-black rounded-lg overflow-hidden shadow-md hover:scale-[1.02] transition-transform duration-300"
          >
            {/* Ícone e duração */}
            <div className="bg-orange-500 flex flex-col items-center justify-center p-6 w-1/3">
              <Calendar size={48} className="text-white mb-2" />
              <p className="text-4xl font-bold text-white">{plano.id}</p>
              <span className="text-white text-sm">{plano.meses}</span>
            </div>

            {/* Descrição */}
            <div className="flex flex-col justify-center px-6 py-4 w-2/3">
              <h2 className="text-lg font-bold mb-1">{plano.titulo}</h2>
              <p>Mensalidade {plano.valor}</p>
              <p>Taxa única de matrícula {plano.taxa}</p>
              <button className="mt-3 bg-black text-white px-4 py-2 rounded font-semibold hover:bg-gray-800">
                MATRICULE-SE
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}