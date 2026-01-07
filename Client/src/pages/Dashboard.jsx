import { Users, Dumbbell, Activity, TrendingUp, Plus, Calendar, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Card from '../components/ui/Card'

const Dashboard = () => {
  // Datos simulados (Mock Data)
  const stats = [
    { label: 'Clientes Activos', value: '12', icon: Users, color: 'text-blue-500', trend: '+2 este mes' },
    { label: 'Rutinas Asignadas', value: '8', icon: Dumbbell, color: 'text-purple-500', trend: '4 pendientes' },
    { label: 'Sesiones Completadas', value: '45', icon: Activity, color: 'text-green-500', trend: '+15% vs mes anterior' },
  ]

  const recentActivity = [
    { id: 1, text: "Juan Pérez completó 'Hipertrofia Piernas'", time: "Hace 10 min", type: "success" },
    { id: 2, text: "María Gonzalez actualizó su peso (65kg)", time: "Hace 2 horas", type: "info" },
    { id: 3, text: "Nueva rutina creada para Carlos Ruiz", time: "Hace 5 horas", type: "neutral" },
  ]

  return (
    <div className="space-y-8">
      
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Hola, Lautaro 👋</h1>
          <p className="text-gray-400 mt-1">Aquí tienes el resumen de tu día.</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 px-4 py-2 rounded-lg">
          <p className="text-white font-medium text-sm">
            {new Date().toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>
      </div>

      {/* Métricas Clave (Stats) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6 flex items-start justify-between group hover:border-blue-500/30 transition-all">
            <div>
              <p className="text-gray-400 text-sm font-medium mb-1">{stat.label}</p>
              <h3 className="text-4xl font-bold text-white mb-2">{stat.value}</h3>
              <span className="inline-flex items-center gap-1 text-xs font-medium bg-gray-800 text-gray-300 px-2.5 py-1 rounded-full border border-gray-700">
                <TrendingUp size={12} />
                {stat.trend}
              </span>
            </div>
            <div className={`p-4 rounded-2xl bg-gray-900 border border-gray-800 ${stat.color} group-hover:scale-110 transition-transform`}>
              <stat.icon size={24} />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Accesos Rápidos (2/3 de ancho) */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-white">Accesos Rápidos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Botón Nuevo Cliente */}
            <Link to="/clients/new" className="group">
              <div className="p-6 h-full bg-gray-900 border border-gray-800 rounded-2xl hover:border-blue-500/50 hover:bg-blue-900/10 transition-all flex items-center gap-5 cursor-pointer relative overflow-hidden">
                <div className="bg-blue-600 rounded-xl p-4 text-white group-hover:scale-110 transition-transform shadow-lg shadow-blue-900/20 z-10">
                  <Plus size={28} />
                </div>
                <div className="z-10">
                  <h3 className="font-bold text-white text-lg group-hover:text-blue-400 transition-colors">Nuevo Cliente</h3>
                  <p className="text-sm text-gray-400 mt-1">Registrar usuario</p>
                </div>
                {/* Decoración de fondo */}
                <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all"></div>
              </div>
            </Link>

            {/* Botón Crear Rutina */}
            <Link to="/routines/new" className="group">
              <div className="p-6 h-full bg-gray-900 border border-gray-800 rounded-2xl hover:border-purple-500/50 hover:bg-purple-900/10 transition-all flex items-center gap-5 cursor-pointer relative overflow-hidden">
                <div className="bg-purple-600 rounded-xl p-4 text-white group-hover:scale-110 transition-transform shadow-lg shadow-purple-900/20 z-10">
                  <Dumbbell size={28} />
                </div>
                <div className="z-10">
                  <h3 className="font-bold text-white text-lg group-hover:text-purple-400 transition-colors">Crear Rutina</h3>
                  <p className="text-sm text-gray-400 mt-1">Diseñar plan</p>
                </div>
                {/* Decoración de fondo */}
                <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all"></div>
              </div>
            </Link>

          </div>

          {/* Banner de Agenda */}
          <div className="p-6 bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700/50 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-800 rounded-full text-gray-300 border border-gray-700">
                <Calendar size={24} />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">Agenda Semanal</h3>
                <p className="text-gray-400 text-sm">No tienes revisiones pendientes para hoy.</p>
              </div>
            </div>
            <button className="text-sm font-medium text-white hover:text-blue-400 flex items-center gap-1 transition-colors">
              Ver calendario <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

        {/* Actividad Reciente (Sidebar derecho) */}
        <div className="lg:col-span-1">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Actividad</h2>
            <button className="text-xs text-blue-400 hover:text-blue-300 font-medium">Ver todo</button>
          </div>
          
          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
            {recentActivity.map((activity, index) => (
              <div key={activity.id} className={`p-4 flex gap-4 items-start hover:bg-gray-800/50 transition-colors ${index !== recentActivity.length - 1 ? 'border-b border-gray-800' : ''}`}>
                <div className={`mt-2 w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                  activity.type === 'success' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 
                  activity.type === 'info' ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]' : 'bg-gray-500'
                }`} />
                <div>
                  <p className="text-sm text-gray-200 font-medium leading-snug">{activity.text}</p>
                  <p className="text-xs text-gray-500 mt-1.5 font-mono">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard