import React from 'react'

// O componente ExerciseItem foi otimizado para o tema escuro
function ExerciseItem({ name, imageSrc }) {
  return (
    <div className="flex items-center gap-4 group cursor-pointer">
      <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-800 rounded-2xl p-2 flex-shrink-0 shadow-md transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-orange-500/20">
        <img
          src={imageSrc}
          alt={name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div>
        <span className="text-lg md:text-xl font-medium text-gray-300 group-hover:text-orange-500 transition-colors duration-300">
          {name}
        </span>
      </div>
    </div>
  )
}

// Componente principal da página de Treinos
export default function Treinos() {
  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto px-6 py-12">

        {/* Título da Página */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            Nossas Sugestões de <span className="text-orange-500">Treinos</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-300">
            Encontre a rotina ideal para seus objetivos, seja você iniciante ou avançado.
          </p>
        </div>

        {/* Container dos Cards de Treino */}
        <div className="space-y-12 max-w-5xl mx-auto">

          {/* Card 1: Treino ABC */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
              Treino ABC <span className="text-gray-400 font-normal text-2xl">(Push/Pull/Legs)</span>
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-orange-500 border-b border-gray-700 pb-3 mb-6">Dia 1 - Push (Empurrar)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  <ExerciseItem name="Peito" imageSrc="images/peito.png" />
                  <ExerciseItem name="Ombro" imageSrc="images/ombro.png" />
                  <ExerciseItem name="Tríceps" imageSrc="images/triceps.png" />
                </div>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-orange-500 border-b border-gray-700 pb-3 mb-6">Dia 2 - Pull (Puxar)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  <ExerciseItem name="Costas" imageSrc="images/costas.png" />
                  <ExerciseItem name="Bíceps" imageSrc="images/biceps.png" />
                </div>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-orange-500 border-b border-gray-700 pb-3 mb-6">Dia 3 - Legs (Pernas)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  <ExerciseItem name="Quadríceps" imageSrc="images/quadriceps.png" />
                  <ExerciseItem name="Posterior" imageSrc="images/posterior.png" />
                  <ExerciseItem name="Panturrilha" imageSrc="images/panturrilhas.png" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Treino AB */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
              Treino AB <span className="text-gray-400 font-normal text-2xl">(Iniciante)</span>
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-orange-500 border-b border-gray-700 pb-3 mb-6">Dia 1 - Superiores</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  <ExerciseItem name="Peito" imageSrc="images/peito.png" />
                  <ExerciseItem name="Costas" imageSrc="images/costas.png" />
                  <ExerciseItem name="Ombro" imageSrc="images/ombro.png" />
                  <ExerciseItem name="Tríceps" imageSrc="images/triceps.png" />
                  <ExerciseItem name="Bíceps" imageSrc="images/biceps.png" />
                </div>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-orange-500 border-b border-gray-700 pb-3 mb-6">Dia 2 - Inferiores</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  <ExerciseItem name="Quadríceps" imageSrc="images/quadriceps.png" />
                  <ExerciseItem name="Posterior" imageSrc="images/posterior.png" />
                  <ExerciseItem name="Panturrilha" imageSrc="images/panturrilhas.png" />
                  <ExerciseItem name="Glúteos" imageSrc="images/gluteos.png" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Treino ABCD */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
              Treino ABCD <span className="text-gray-400 font-normal text-2xl">(Avançado)</span>
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-orange-500 border-b border-gray-700 pb-3 mb-6">Dia 1 - Peito e Tríceps</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  <ExerciseItem name="Peito" imageSrc="images/peito.png" />
                  <ExerciseItem name="Tríceps" imageSrc="images/triceps.png" />
                </div>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-orange-500 border-b border-gray-700 pb-3 mb-6">Dia 2 - Costas e Bíceps</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  <ExerciseItem name="Costas" imageSrc="images/costas.png" />
                  <ExerciseItem name="Bíceps" imageSrc="images/biceps.png" />
                </div>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-orange-500 border-b border-gray-700 pb-3 mb-6">Dia 3 - Pernas</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  <ExerciseItem name="Quadríceps" imageSrc="images/quadriceps.png" />
                  <ExerciseItem name="Posterior" imageSrc="images/posterior.png" />
                  <ExerciseItem name="Glúteos" imageSrc="images/gluteos.png" />
                </div>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-orange-500 border-b border-gray-700 pb-3 mb-6">Dia 4 - Ombros e Panturrilha</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  <ExerciseItem name="Ombro" imageSrc="images/ombro.png" />
                  <ExerciseItem name="Panturrilha" imageSrc="images/panturrilhas.png" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}