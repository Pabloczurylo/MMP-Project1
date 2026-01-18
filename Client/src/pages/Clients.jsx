import { useEffect, useState } from 'react'
import { Search, Plus, MoreVertical } from 'lucide-react'
import { Link } from 'react-router-dom'
import Card from '../components/ui/Card' // Asegúrate de que esta ruta sea correcta

const Clients = () => {
  const [clients, setClients] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [openMenu, setOpenMenu] = useState(null)
  const [openStatus, setOpenStatus] = useState(null)
  const [loading, setLoading] = useState(true)

  // URL base de tu servidor
  const API_URL = 'http://localhost:3000/api/users'

  // 1. Cargar clientes desde la Base de Datos
  useEffect(() => {
    const fetchClients = async () => {
      try {
        // ✅ CORRECCIÓN 1: Comillas invertidas (``) agregadas
        const response = await fetch(`${API_URL}/`) 
        if (!response.ok) throw new Error('Error al obtener clientes')
        const data = await response.json()
        setClients(data)
      } catch (error) {
        console.error("Error de conexión:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchClients()
  }, [])

  // 2. Cerrar menús al hacer clic fuera
  useEffect(() => {
    const handleDocClick = (e) => {
      if (e.target.closest && (
        e.target.closest('[data-menu]') ||
        e.target.closest('[data-menu-toggle]') ||
        e.target.closest('[data-status-menu]') ||
        e.target.closest('[data-status-toggle]')
      )) return
      setOpenMenu(null)
      setOpenStatus(null)
    }
    document.addEventListener('click', handleDocClick)
    return () => document.removeEventListener('click', handleDocClick)
  }, [])

  const toggleMenu = (id) => setOpenMenu(prev => prev === id ? null : id)
  const toggleStatus = (id) => setOpenStatus(prev => prev === id ? null : id)

  // 3. Actualizar estado
  const updateStatus = async (id, status) => {
    try {
      // ✅ CORRECCIÓN 2: Comillas invertidas agregadas
      const response = await fetch(`${API_URL}/${id}`, { 
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      
      if (response.ok) {
        setClients(clients.map(c => (c._id === id || c.id === id) ? { ...c, status } : c))
        setOpenStatus(null)
      }
    } catch (error) {
      alert("No se pudo actualizar el estado")
    }
  }

  // 4. Eliminar cliente
  const deleteClient = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este cliente?")) return

    try {
      // ✅ CORRECCIÓN 3: Comillas invertidas agregadas
      const response = await fetch(`${API_URL}/${id}`, { 
        method: 'DELETE'
      })

      if (response.ok) {
        setClients(clients.filter(c => (c._id !== id && c.id !== id)))
        setOpenMenu(null)
      }
    } catch (error) {
      alert("No se pudo eliminar el cliente")
    }
  }

  // Filtro de búsqueda
  const q = searchTerm.trim().toLowerCase()
  const filteredClients = q
    ? clients.filter(c => (
        // ✅ CORRECCIÓN 4: Cambiado 'c.name' por 'c.nombre' (como está en tu Backend)
        (c.nombre && c.nombre.toLowerCase().includes(q)) ||
        (c.email && c.email.toLowerCase().includes(q)) 
      ))
    : clients

  if (loading) return <div className="text-white p-8">Cargando clientes desde el servidor...</div>

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Gestión de Clientes</h1>
          <p className="text-gray-400">Base de datos MongoDB conectada.</p>
        </div>
        <Link 
          to="/clients/new" 
          className="w-full sm:w-auto justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 font-medium transition-colors"
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
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre o email..." 
            className="w-full bg-gray-950 border border-gray-800 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
      </Card>

      {/* Tabla Desktop */}
      <Card className="hidden sm:block p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400"> 
            <thead className="bg-gray-800 text-gray-200 uppercase">
              <tr>
                <th className="px-6 py-4">Cliente</th>
                <th className="px-6 py-4">Contacto</th>
                <th className="px-6 py-4">Rol</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredClients.map((client) => {
                // MongoDB usa _id, el frontend a veces usa id. Normalizamos:
                const clientId = client._id || client.id;
                
                return (
                  <tr key={clientId} className="hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4 text-white font-medium">
                        {/* ✅ CORRECCIÓN 5: Usamos client.nombre */}
                        {client.nombre} 
                    </td>
                    <td className="px-6 py-4">{client.email}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-gray-800 rounded text-gray-300 border border-gray-700">
                        {client.isAdmin ? 'Admin' : 'Cliente'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right relative">
                      <button 
                        data-menu-toggle 
                        onClick={() => toggleMenu(clientId)} 
                        className="text-gray-500 hover:text-white"
                      >
                        <MoreVertical size={18} />
                      </button>
                      
                      {openMenu === clientId && (
                        <div data-menu className="absolute right-6 mt-2 w-40 bg-gray-900 border border-gray-800 rounded shadow-xl z-50">
                           <button 
                             onClick={() => deleteClient(clientId)} 
                             className="w-full text-left px-4 py-2 hover:bg-red-600 text-white transition-colors"
                           >
                             Eliminar
                           </button>
                        </div>
                      )}
                    </td>
                  </tr>
                )
              })}
              {filteredClients.length === 0 && (
                 <tr>
                    <td colSpan="4" className="text-center py-8 text-gray-500">
                        No hay clientes registrados aún.
                    </td>
                 </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

export default Clients