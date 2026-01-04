import { Search, Plus, Calendar, User, Dumbbell, MoreVertical, Play } from 'lucide-react'
import { Link } from 'react-router-dom'
import Card from '../components/ui/Card'

const Routines = () => {
  // Mock Data: Rutinas ya creadas
  const routines = [
    { 
      id: 1, 
      name: "Hipertrofia Piernas - Fase 1", 
      client: "Ana García", 
      exercisesCount: 6, 
      frequency: "3 días/sem",
      lastEdited: "Hoy" 
    },
    { 
      id: 2, 
      name: "Upper Body Power", 
      client: "Carlos Ruiz", 
      exercisesCount: 8, 
      frequency: "4 días/sem",
      lastEdited: "Ayer" 
    },
    { 
      id: 3, 
      name: "Adaptación Anatómica", 
      client: "Lucía Mendez", 
      exercisesCount: 12, 
      frequency: "2 días/sem",
      lastEdited: "Hace 3 días" 
    },
    { 
      id: 4, 
      name: "Core & Cardio", 
      client: "Marcos Diaz", 
      exercisesCount: 5, 
      frequency: "Libre",
      lastEdited: "Semana pasada" 
    },
  ]

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Mis Rutinas</h1>
          <p className="text-gray-400">Gestiona y asigna entrenamientos a tus clientes.</p>
        </div>
        <Link 
          to="/routines/new" 
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors"
        >
          <Plus size={20} />
          Nueva Rutina
        </Link>
      </div>

      {/* Barra de Búsqueda */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input 
            type="text" 
            placeholder="Buscar por nombre de rutina o cliente..." 
            className="w-full bg-gray-950 border border-gray-800 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-600"
          />
        </div>
      </Card>

      {/* Grid de Rutinas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {routines.map((routine) => (
          <Card key={routine.id} className="p-5 hover:border-blue-500/50 transition-all group relative">
            
            {/* Encabezado de la Tarjeta */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-white text-lg group-hover:text-blue-400 transition-colors">
                  {routine.name}
                </h3>
                <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
                  <User size={14} />
                  <span>{routine.client}</span>
                </div>
              </div>
              <button className="text-gray-500 hover:text-white p-1">
                <MoreVertical size={18} />
              </button>
            </div>

            {/* Stats de la Rutina */}
            <div className="flex items-center gap-4 text-sm text-gray-400 mb-6 bg-gray-900/50 p-3 rounded-lg border border-gray-800">
              <div className="flex items-center gap-1.5">
                <Dumbbell size={14} className="text-blue-500" />
                <span>{routine.exercisesCount} Ejercicios</span>
              </div>
              <div className="w-px h-4 bg-gray-700"></div>
              <div className="flex items-center gap-1.5">
                <Calendar size={14} className="text-purple-500" />
                <span>{routine.frequency}</span>
              </div>
            </div>

            {/* Footer / Acciones */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-800">
              <span className="text-xs text-gray-600 font-medium">
                Editado: {routine.lastEdited}
              </span>
              <button className="flex items-center gap-2 text-sm font-medium text-white hover:text-blue-400 transition-colors">
                <Play size={16} fill="currentColor" />
                Ver Detalle
              </button>
            </div>

          </Card>
        ))}
      </div>
    </div>
  )
}

export default Routines