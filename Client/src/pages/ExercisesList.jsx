import { useState } from 'react'
import { Search, Plus, Dumbbell, MoreHorizontal, Edit2, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'

const ExercisesList = () => {
  // Estados
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [activeMenu, setActiveMenu] = useState(null)

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

  const toggleMenu = (id) => {
    if (activeMenu === id) {
      setActiveMenu(null)
    } else {
      setActiveMenu(id)
    }
  }

  const handleDelete = (id) => {
    if(window.confirm("¿Seguro que quieres eliminar este ejercicio?")) {
      console.log("Eliminando ejercicio ID:", id)
      setActiveMenu(null)
    }
  }

  const categories = ['Todos', 'Pecho', 'Espalda', 'Piernas', 'Brazos', 'Core']

  return (
    <div className="max-w-6xl mx-auto space-y-6 text-white p-4">
      {/* Encabezado Responsivo */}
      <div className="flex justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Banco de Ejercicios</h1>
          <p className="text-gray-400 text-sm md:text-base">Gestiona la biblioteca de movimientos.</p>
        </div>
        <Link 
          to="/exercises/new" 
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 md:px-4 md:py-2 rounded-lg flex items-center gap-2 font-bold transition-colors shadow-lg shadow-blue-900/20"
        >
          <Plus size={20} /> 
          {/* En móvil ocultamos el texto "Nuevo" para ahorrar espacio */}
          <span className="hidden md:inline">Nuevo</span>
        </Link>
      </div>

      {/* Buscador y Filtros */}
      <div className="bg-[#111111] p-4 rounded-xl border border-gray-800 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Buscar ejercicio..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#1a1a1a] p-3 pl-10 rounded-xl border border-gray-800 focus:border-blue-500 outline-none transition-all placeholder:text-gray-600"
          />
          <Search className="absolute left-3 top-3.5 text-gray-500" size={18} />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm border whitespace-nowrap transition-colors ${
                selectedCategory === cat 
                  ? 'bg-blue-900/30 text-blue-400 border-blue-500' 
                  : 'bg-[#1a1a1a] text-gray-400 border-gray-800 hover:border-gray-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Lista (Tabla Responsiva) */}
      <div className="bg-[#111111] rounded-xl border border-gray-800 overflow-visible min-h-[400px]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#1a1a1a] text-gray-400 uppercase text-xs">
              <tr>
                <th className="p-4 pl-6">Nombre</th>
                <th className="p-4 hidden md:table-cell">Grupo</th>
                <th className="p-4 hidden md:table-cell">Equipo</th>
                <th className="p-4 text-right pr-6"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredExercises.map(ex => (
                <tr key={ex.id} className="hover:bg-gray-900/50 relative group">
                  <td className="p-4 pl-6 font-semibold">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-800 rounded-lg text-gray-400 hidden sm:block">
                         <Dumbbell size={18} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white">{ex.name}</span>
                        {/* En móvil mostramos el músculo debajo del nombre */}
                        <span className="text-xs text-blue-400 md:hidden">{ex.muscle}</span>
                      </div>
                    </div>
                  </td>
                  
                  <td className="p-4 text-sm text-gray-300 hidden md:table-cell">
                    <span className="px-2 py-1 rounded-md bg-gray-800 border border-gray-700 text-xs">
                      {ex.muscle}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-300 hidden md:table-cell">{ex.equipment}</td>
                  
                  {/* Acciones */}
                  <td className="p-4 pr-6 text-right relative">
                    <button 
                      onClick={() => toggleMenu(ex.id)}
                      className={`p-2 rounded-lg transition-colors ${activeMenu === ex.id ? 'bg-gray-800 text-white' : 'text-gray-500 hover:text-white hover:bg-gray-800'}`}
                    >
                      <MoreHorizontal size={20}/>
                    </button>

                    {/* Menú Flotante */}
                    {activeMenu === ex.id && (
                      <div className="absolute right-10 top-2 w-40 bg-[#1a1a1a] border border-gray-700 rounded-xl shadow-2xl z-50 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-100">
                        <button 
                          className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-gray-800 hover:text-white text-left transition-colors"
                          onClick={() => alert(`Editando: ${ex.name}`)}
                        >
                          <Edit2 size={16} className="text-blue-500"/>
                          Editar
                        </button>
                        <div className="h-[1px] bg-gray-800"></div>
                        <button 
                          className="flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-900/20 hover:text-red-300 text-left transition-colors"
                          onClick={() => handleDelete(ex.id)}
                        >
                          <Trash2 size={16} />
                          Eliminar
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredExercises.length === 0 && (
           <div className="p-8 text-center text-gray-500">
             No se encontraron ejercicios.
           </div>
        )}
      </div>
    </div>
  )
}

export default ExercisesList