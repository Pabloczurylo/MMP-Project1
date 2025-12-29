import { Search, Plus, MoreVertical, Mail, Phone } from 'lucide-react'
import Card from '../components/ui/Card'
import { Link } from 'react-router-dom'

const Clients = () => {
  // Datos simulados para ver cómo queda
  const clients = [
    { id: 1, name: "Facundo Sorane", plan: "Pérdida de Peso", status: "Activo", email: "Facundo@email.com", phone: "+54 9 11 1234-5678" },
    { id: 2, name: "Maxi Prieto", plan: "Calistenia", status: "Pendiente", email: "carlos@email.com", phone: "+54 9 11 8765-4321" },
    { id: 3, name: "Matías Saravia", plan: "Pilates", status: "Activo", email: "matias@email.com", phone: "+54 9 11 5555-6666" },
    { id: 4, name: "Jose Cordoba", plan: "Pérdida de Peso", status: "Inactivo", email: "jose@email.com", phone: "+54 9 11 9999-0000" },
    { id: 5, name: "Pablo Czurylo", plan: "Crossfit", status: "Activo", email: "pablo@email.com", phone: "+54 9 11 1111-2222" },
  ]

  return (
    <div className="space-y-6">
      {/*  Encabezado y Botón de Crear */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Gestión de Clientes</h1>
          <p className="text-gray-400">Administra a tus alumnos y sus planes.</p>
        </div>
        <Link 
           to="/clients/new" 
           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 font-medium transition-colors"
        >
          <Plus size={20} />
          Nuevo Cliente
        </Link>
      </div>

      {/* Barra de Búsqueda */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input 
            type="text" 
            placeholder="Buscar por nombre, email o plan..." 
            className="w-full bg-gray-950 border border-gray-800 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-600"
          />
        </div>
      </Card>

      {/* Tabla de Clientes */}
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-gray-800 text-gray-200 uppercase font-medium">
              <tr>
                <th className="px-6 py-4">Cliente</th>
                <th className="px-6 py-4">Contacto</th>
                <th className="px-6 py-4">Plan Actual</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-800/50 transition-colors group">
                  {/* Columna Nombre + Avatar */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold">
                        {client.name.charAt(0)}
                      </div>
                      <span className="font-medium text-white">{client.name}</span>
                    </div>
                  </td>
                  
                  {/* Columna Contacto */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Mail size={14} /> {client.email}
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 text-xs">
                        <Phone size={14} /> {client.phone}
                      </div>
                    </div>
                  </td>

                  {/* Columna Plan */}
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-gray-800 rounded text-gray-300 border border-gray-700">
                      {client.plan}
                    </span>
                  </td>

                  {/* Columna Estado */}
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                      client.status === 'Activo' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                      client.status === 'Pendiente' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                      'bg-red-500/10 text-red-500 border-red-500/20'
                    }`}>
                      {client.status}
                    </span>
                  </td>

                  {/* Columna Acciones */}
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-500 hover:text-white p-2 rounded-lg hover:bg-gray-700 transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Paginación */}
        <div className="p-4 border-t border-gray-800 flex justify-between items-center text-xs text-gray-500">
          <span>Mostrando 5 de 24 clientes</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-gray-800 rounded hover:bg-gray-700 disabled:opacity-50">Anterior</button>
            <button className="px-3 py-1 bg-gray-800 rounded hover:bg-gray-700 text-white">Siguiente</button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Clients