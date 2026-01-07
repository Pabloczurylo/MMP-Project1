import { useState } from 'react'
import { Search, Plus, Dumbbell, PlayCircle, MoreHorizontal } from 'lucide-react'
import { Link } from 'react-router-dom'

const ExercisesList = () => {
  // 1. Estados
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todos')


  // Datos Simulados
  const exercises = [
    { id: 1, name: 'Press de Banca Plano', muscle: 'Pecho', equipment: 'Barra', videoUrl: '#' },
    { id: 2, name: 'Sentadilla Libre', muscle: 'Piernas', equipment: 'Barra', videoUrl: '#' },
    { id: 3, name: 'Dominadas Pronas', muscle: 'Espalda', equipment: 'Peso Corporal', videoUrl: '#' },
    { id: 4, name: 'Curl de Bíceps', muscle: 'Brazos', equipment: 'Mancuernas', videoUrl: '#' },
    { id: 5, name: 'Plancha Abdominal', muscle: 'Core', equipment: 'Mat', videoUrl: '#' },
    { id: 6, name: 'Peso Muerto', muscle: 'Piernas', equipment: 'Barra', videoUrl: '#' },
  ]

  // Lógica de Filtrado
  const filteredExercises = exercises.filter(ex => {
    const matchesSearch = ex.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'Todos' || ex.muscle === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = ['Todos', 'Pecho', 'Espalda', 'Piernas', 'Brazos', 'Core']

  return (
    <div className="max-w-6xl mx-auto space-y-6 text-white p-4">
      {/* Encabezado */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Banco de Ejercicios</h1>
          <p className="text-gray-400">Gestiona la biblioteca de movimientos.</p>
        </div>
        <button className="bg-blue-600 px-4 py-2 rounded-lg flex items-center gap-2 font-bold">
          <Plus size={20} /> Nuevo
        </button>
      </div>

      {/* Buscador y Filtros */}
      <div className="bg-[#111111] p-4 rounded-xl border border-gray-800 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Buscar ejercicio..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#1a1a1a] p-3 pl-10 rounded-xl border border-gray-800 focus:border-blue-500 outline-none"
          />
          <Search className="absolute left-3 top-3.5 text-gray-500" size={18} />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm border transition-colors ${
                selectedCategory === cat 
                  ? 'bg-blue-900/30 text-blue-400 border-blue-500' 
                  : 'bg-[#1a1a1a] text-gray-400 border-gray-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Lista (Tabla) */}
      <div className="bg-[#111111] rounded-xl border border-gray-800 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#1a1a1a] text-gray-400 uppercase text-xs">
            <tr>
              <th className="p-4">Nombre</th>
              <th className="p-4">Grupo</th>
              <th className="p-4">Equipo</th>
              <th className="p-4 text-right">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filteredExercises.map(ex => (
              <tr key={ex.id} className="hover:bg-gray-900/50">
                <td className="p-4 font-semibold flex items-center gap-3">
                  <Dumbbell size={16} className="text-gray-500" />
                  {ex.name}
                </td>
                <td className="p-4 text-sm text-gray-300">{ex.muscle}</td>
                <td className="p-4 text-sm text-gray-300">{ex.equipment}</td>
                <td className="p-4 text-right">
                  <button className="text-gray-500 hover:text-white"><MoreHorizontal size={20}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ExercisesList