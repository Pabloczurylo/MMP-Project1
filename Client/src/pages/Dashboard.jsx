import { Users, Activity, DollarSign, Dumbbell } from 'lucide-react'
import Card from '../components/ui/Card'

const Dashboard = () => {
  // Datos simulados (luego vendrán de la base de datos)
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

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div>
        <h1 className="text-2xl font-bold text-white">Hola, Lautaro</h1>
        <p className="text-gray-400">Aquí tienes el resumen de tu rendimiento hoy.</p>
      </div>

      {/* Grid de Tarjetas (1 columna en cel, 2 en tablet, 4 en PC) */}
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

      {/* Sección Grande de Ejemplo (Para llenar espacio) */}
      <Card className="h-64 flex items-center justify-center border-dashed border-gray-800 bg-transparent">
        <p className="text-gray-500">Aquí irá el Gráfico de Rendimiento 📈</p>
      </Card>
    </div>
  )
}

export default Dashboard