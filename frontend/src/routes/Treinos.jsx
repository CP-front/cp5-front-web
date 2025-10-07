import React from 'react'

export default function Treinos() {
  return (
    <section className="bg-[#0c0a0a] p-6 md:p-8 lg:p-12">
      <div className="max-w-2xl">
        <h1 className="text-[#f39a35] text-4xl md:text-5xl font-bold mb-2">TREINOS</h1>
        <p className="text-[#f39a35] text-lg md:text-xl mb-8">
          Nossas sugestões de treinos pra você!!
        </p>
      </div>

      {/* Card 1 */}
      <div className="bg-[#ededed] rounded-3xl p-6 md:p-8 mb-8">
        <h2 className="text-[#f39a35] text-3xl md:text-4xl font-bold mb-3">Treino ABC (2x na semana - opcional)</h2>
        <div className="mb-8">
          <h3 className="text-[#f39a35] text-xl md:text-2xl font-semibold mt-4 mb-4">Dia 1 - Treino A (Push)</h3>
          <div className="space-y-4">
            <ExerciseItem name="Peito" imageSrc="images/peito.png"/>
            <ExerciseItem name="Ombro" imageSrc="images/ombro.png"/>
            <ExerciseItem name="Tríceps" imageSrc="images/triceps.png"/>
          </div>
        </div>
        <div className="mb-8">
          <h3 className="text-[#f39a35] text-xl md:text-2xl font-semibold mt-4 mb-4">Dia 2 - Treino B (Pull)</h3>
          <div className="space-y-4">
            <ExerciseItem name="Costas" imageSrc="images/costas.png"/>
            <ExerciseItem name="Biceps" imageSrc="images/biceps.png"/>
          </div>
        </div>
        <div className="mb-8">
          <h3 className="text-[#f39a35] text-xl md:text-2xl font-semibold mt-4 mb-4">Dia 3 - Treino C (Legs)</h3>
          <div className="space-y-4">
            <ExerciseItem name="Quadriceps" imageSrc="images/quadriceps.png"/>
            <ExerciseItem name="Posterior" imageSrc="images/posterior.png"/>
            <ExerciseItem name="Panturrilha" imageSrc="images/panturrilhas.png"/>
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div className="bg-[#ededed] rounded-3xl p-6 md:p-8 mb-8">
        <h2 className="text-[#f39a35] text-3xl md:text-4xl font-bold mb-3">Treino AB - 2x semana</h2>
        <div className="mb-8">
          <h3 className="text-[#f39a35] text-xl md:text-2xl font-semibold mt-4 mb-4">Dia 1 - Treino A (Superiores)</h3>
          <div className="space-y-4">
            <ExerciseItem name="Peito" alt="Peito" imageSrc="images/peito.png"/>
            <ExerciseItem name="Costas" imageSrc="images/costas.png"/>
            <ExerciseItem name="Ombro" imageSrc="images/ombro.png"/>
            <ExerciseItem name="Tríceps" imageSrc="images/triceps.png"/>
            <ExerciseItem name="Biceps" imageSrc="images/biceps.png"/>
          </div>
        </div>
        <div className="mb-8">
          <h3 className="text-[#f39a35] text-xl md:text-2xl font-semibold mt-4 mb-4">Dia 2 - Treino B (Inferiores)</h3>
          <div className="space-y-4">
            <ExerciseItem name="Quadriceps" imageSrc="images/quadriceps.png"/>
            <ExerciseItem name="Posterior" imageSrc="images/posterior.png"/>
            <ExerciseItem name="Panturrilha" imageSrc="images/panturrilhas.png"/>
            <ExerciseItem name="Gluteos" imageSrc="images/gluteos.png"/>
          </div>
        </div>
      </div>

      {/* Card 3 */}
      <div className="bg-[#ededed] rounded-3xl p-6 md:p-8 mb-8">
        <h2 className="text-[#f39a35] text-3xl md:text-4xl font-bold mb-3">Treino ABCD</h2>
        <div className="mb-8">
          <h3 className="text-[#f39a35] text-xl md:text-2xl font-semibold mt-4 mb-4">Dia 1 - Treino A</h3>
          <div className="space-y-4">
            <ExerciseItem name="Peito" imageSrc="images/peito.png"/>
            <ExerciseItem name="Tríceps" imageSrc="images/triceps.png"/>
          </div>
        </div>
        <div className="mb-8">
          <h3 className="text-[#f39a35] text-xl md:text-2xl font-semibold mt-4 mb-4">Dia 2 - Treino B</h3>
          <div className="space-y-4">
            <ExerciseItem name="Costas" imageSrc="images/costas.png"/>
            <ExerciseItem name="Biceps" imageSrc="images/biceps.png"/>
          </div>
        </div>
        <h3 className="text-[#f39a35] text-xl md:text-2xl font-semibold mt-4 mb-4">Dia 3 - Treino C</h3>
        <div className="space-y-4">
            <ExerciseItem name="Quadriceps" imageSrc="images/quadriceps.png"/>
            <ExerciseItem name="Posterior" imageSrc="images/posterior.png"/>
            <ExerciseItem name="Gluteos" imageSrc="images/gluteos.png"/>
        </div>
        <h3 className="text-[#f39a35] text-xl md:text-2xl font-semibold mt-4 mb-4">Dia 4 - Treino D</h3>
        <div className="space-y-4">
            <ExerciseItem name="Ombro" imageSrc="images/ombro.png"/>
            <ExerciseItem name="Panturrilha" imageSrc="images/panturrilhas.png"/>
        </div>
      </div>

    </section>
  )
}

function ExerciseItem({ name, imageSrc }) {
  return (
    <div className="flex items-center gap-6">
      <div className="bg-white rounded-2xl p-3 h-46 md: md:h-48 flex items-center justify-center flex-shrink-0 shadow-sm transition transform hover:scale-105 hover:shadow-lg object-cover">
        <img
          src={imageSrc}
          alt={name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-[#f39a35]" />
        <span className="text-[#f39a35] text-xl md:text-2xl font-medium">{name}</span>
      </div>
    </div>
  )
}