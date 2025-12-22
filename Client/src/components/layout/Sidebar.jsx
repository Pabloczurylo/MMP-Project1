import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Users, LogOut } from 'lucide-react'

const Sidebar = () => {
  // Lista de links para no repetir código
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Users, label: 'Clientes', path: '/clients' },
  ]

  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col h-screen fixed left-0 top-0">
      {/* Logo / Título */}
      <div className="h-16 flex items-center justify-center border-b border-gray-800">
        <h1 className="text-xl font-bold text-blue-500">PT Manager </h1>
      </div>

      {/* Menú de Navegación */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white' // Estilo cuando estás en la página
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white' // Estilo normal
              }`
            }
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Botón de Salir (Abajo del todo) */}
      <div className="p-4 border-t border-gray-800">
        <button className="flex items-center gap-3 text-gray-400 hover:text-red-400 w-full px-4 py-3 transition-colors">
          <LogOut size={20} />
          <span className="font-medium">Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar