
import { useEffect, useState, useRef } from 'react'
import { Search, Plus, MoreVertical, Mail, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import Card from '../components/ui/Card'

const defaultClients = [
  { id: 1, name: "Ana García", plan: "Pérdida de Peso", status: "Activo", email: "ana@email.com", phone: "+54 9 11 1234-5678" },
  { id: 2, name: "Carlos Ruiz", plan: "Hipertrofia", status: "Pendiente", email: "carlos@email.com", phone: "+54 9 11 8765-4321" },
  { id: 3, name: "Lucía Mendez", plan: "Funcional", status: "Activo", email: "lucia@email.com", phone: "+54 9 11 5555-6666" },
  { id: 4, name: "Marcos Diaz", plan: "Rehabilitación", status: "Inactivo", email: "marcos@email.com", phone: "+54 9 11 9999-0000" },
  { id: 5, name: "Sofia Perez", plan: "Crossfit", status: "Activo", email: "sofia@email.com", phone: "+54 9 11 1111-2222" },
]

const Clients = () => {
  const [clients, setClients] = useState(() => {
    const stored = localStorage.getItem('clients')
    return stored ? JSON.parse(stored) : defaultClients
  })
  const [openMenu, setOpenMenu] = useState(null)
  const pageRef = useRef(null)

  useEffect(() => {
    const sync = () => {
      const stored = localStorage.getItem('clients')
      setClients(stored ? JSON.parse(stored) : defaultClients)
    }

    // Initial sync and listen for changes from other tabs
    sync()
    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [])

  useEffect(() => {
    const handleDocClick = (e) => {
      // if click is inside a menu or its toggle, do nothing
      if (e.target.closest && (e.target.closest('[data-menu]') || e.target.closest('[data-menu-toggle]'))) return
      setOpenMenu(null)
    }
    document.addEventListener('click', handleDocClick)
    return () => document.removeEventListener('click', handleDocClick)
  }, [])

  const toggleMenu = (id) => {
    setOpenMenu(prev => prev === id ? null : id)
  }

  const deleteClient = (id) => {
    const updated = clients.filter(c => c.id !== id)
    setClients(updated)
    localStorage.setItem('clients', JSON.stringify(updated))
    setOpenMenu(null)
  }

  return (
    <div className="space-y-6">
      {/* 1. Encabezado Responsive (Columna en móvil, Fila en PC) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Gestión de Clientes</h1>
          <p className="text-gray-400">Administra a tus alumnos y sus planes.</p>
        </div>
        <Link 
          to="/clients/new" 
          className="w-full sm:w-auto justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 font-medium transition-colors"
        >
          <Plus size={20} />
          Nuevo Cliente
        </Link>
      </div>

      {/* 2. Barra de Búsqueda */}
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

      {/* 3. Vista de Clientes Responsive */}
      {/* Versión móvil: Lista de tarjetas */}
      <div className="block sm:hidden space-y-4 overflow-x-hidden">
        {clients.map((client) => (
          <Card key={client.id} className="p-4 overflow-hidden">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold">
                {client.name.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-medium text-white truncate block">{client.name}</span>
                <div className="text-sm text-gray-400 mt-1">
                  <div className="flex items-center gap-2">
                    <Mail size={14} /> <span className="truncate">{client.email}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Phone size={14} /> <span className="truncate">{client.phone}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="min-w-0 flex-1">
                <span className="px-2 py-1 bg-gray-800 rounded text-gray-300 border border-gray-700 text-sm truncate inline-block mr-2">
                  {client.plan}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border truncate inline-block ${
                  client.status === 'Activo' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                  client.status === 'Pendiente' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                  'bg-red-500/10 text-red-500 border-red-500/20'
                }`}>
                  {client.status}
                </span>
              </div>
              <div className="relative">
                <button data-menu-toggle onClick={() => toggleMenu(client.id)} className="text-gray-500 hover:text-white p-2 rounded-lg hover:bg-gray-700 transition-colors flex-shrink-0">
                  <MoreVertical size={18} />
                </button>
                {openMenu === client.id && (
                  <div data-menu className="absolute right-0 mt-2 w-36 bg-gray-900 border border-gray-800 rounded shadow-lg z-50">
                    <button onClick={() => deleteClient(client.id)} className="w-full text-left px-4 py-2 hover:bg-red-600 hover:text-white text-red-400">Eliminar</button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
        
        {/* Paginación móvil */}
        <div className="flex flex-col justify-between items-center gap-4 text-xs text-gray-500 pt-4 border-t border-gray-800 overflow-x-hidden">
          <span className="truncate">Mostrando 5 de 24 clientes</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-gray-800 rounded hover:bg-gray-700 disabled:opacity-50 truncate">Anterior</button>
            <button className="px-3 py-1 bg-gray-800 rounded hover:bg-gray-700 text-white truncate">Siguiente</button>
          </div>
        </div>
      </div>

      {/* Versión desktop: Tabla con Scroll Horizontal */}
      <Card className="hidden sm:block p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400 whitespace-nowrap"> 
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
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold">
                        {client.name.charAt(0)}
                      </div>
                      <span className="font-medium text-white">{client.name}</span>
                    </div>
                  </td>
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
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-gray-800 rounded text-gray-300 border border-gray-700">
                      {client.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                      client.status === 'Activo' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                      client.status === 'Pendiente' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                      'bg-red-500/10 text-red-500 border-red-500/20'
                    }`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="relative inline-block">
                      <button data-menu-toggle onClick={() => toggleMenu(client.id)} className="text-gray-500 hover:text-white p-2 rounded-lg hover:bg-gray-700 transition-colors">
                        <MoreVertical size={18} />
                      </button>
                      {openMenu === client.id && (
                        <div data-menu className="absolute right-0 mt-2 w-36 bg-gray-900 border border-gray-800 rounded shadow-lg z-50">
                          <button onClick={() => deleteClient(client.id)} className="w-full text-left px-4 py-2 hover:bg-red-600 hover:text-white text-red-400">Eliminar</button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Paginación */}
        <div className="p-4 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
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