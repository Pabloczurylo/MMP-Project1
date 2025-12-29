import { Users, Activity, DollarSign, Dumbbell, ArrowRight } from 'lucide-react'
import Card from '../components/ui/Card'

const Dashboard = () => {
  //  Datos simulados para las Estadísticas (Cards Superiores)
  const stats = [
    {
      title: "Clientes Activos",
      value: "12",
      icon: Users,
      change: "+2 este mes",
      color: "text-blue-500",
    },
    {
      title: "Ingresos (Mes)",
      value: "$450.000",
      icon: DollarSign,
      change: "+15% vs mes pasado",
      color: "text-green-500",
    },
    {
      title: "Rutinas Completadas",
      value: "48",
      icon: Activity,
      change: "85% cumplimiento",
      color: "text-purple-500",
    },
    {
      title: "Ejercicios Totales",
      value: "124",
      icon: Dumbbell,
      change: "Biblioteca actualizada",
      color: "text-orange-500",
    },
  ]

  //  Datos simulados para la Tabla
  const recentClients = [
    { id: 1, name: "Ana García", plan: "Pérdida de Peso", status: "Activo", date: "28/12/2025" },
    { id: 2, name: "Carlos Ruiz", plan: "Hipertrofia", status: "Pendiente", date: "27/12/2025" },
    { id: 3, name: "Lucía Mendez", plan: "Funcional", status: "Activo", date: "26/12/2025" },
    { id: 4, name: "Marcos Diaz", plan: "Rehabilitación", status: "Inactivo", date: "20/12/2025" },
  ]

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div>
        <h1 className="text-2xl font-bold text-white">Hola, Lautaro</h1>
        <p className="text-gray-400">Aquí tienes el resumen de tu rendimiento hoy.</p>
      </div>

      {/* Grid de Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:border-gray-700 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">{stat.title}</p>
                <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-lg bg-gray-800/50 ${stat.color}`}>
                <stat.icon size={24} />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              <span className="text-green-400 font-medium">{stat.change}</span>
            </p>
          </Card>
        ))}
      </div>

      {/* Sección Inferior: Tabla y Botones */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Tabla de Clientes */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-white">Últimos Clientes</h2>
          <Card className="p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-400">
                <thead className="bg-gray-800 text-gray-200 uppercase font-medium">
                  <tr>
                    <th className="px-6 py-4">Nombre</th>
                    <th className="px-6 py-4">Plan</th>
                    <th className="px-6 py-4">Estado</th>
                    <th className="px-6 py-4">Fecha</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {recentClients.map((client) => (
                    <tr key={client.id} className="hover:bg-gray-800/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-white">{client.name}</td>
                      <td className="px-6 py-4">{client.plan}</td>
                      <td className="px-6 py-4">
                        {/* Badge de Estado Dinámico */}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          client.status === 'Activo' ? 'bg-green-500/10 text-green-500' :
                          client.status === 'Pendiente' ? 'bg-yellow-500/10 text-yellow-500' :
                          'bg-red-500/10 text-red-500'
                        }`}>
                          {client.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">{client.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pie de tabla */}
            <div className="p-4 border-t border-gray-800 text-center">
              <button className="text-blue-500 hover:text-blue-400 text-sm font-medium inline-flex items-center gap-1 transition-colors">
                Ver todos los clientes <ArrowRight size={16} />
              </button>
            </div>
          </Card>
        </div>

        {/* Acciones Rápidas */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">Acciones Rápidas</h2>
          <Card className="flex flex-col gap-3">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
              <Users size={18} />
              Registrar Cliente
            </button>
            <button className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition-colors border border-gray-700 flex items-center justify-center gap-2">
              <Activity size={18} />
              Crear Nueva Rutina
            </button>
          </Card>
        </div>

      </div>
    </div>
  )
}

export default Dashboard