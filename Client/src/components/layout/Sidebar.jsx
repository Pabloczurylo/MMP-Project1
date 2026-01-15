import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Users, ClipboardList, Dumbbell, LogOut } from 'lucide-react'
import { useAuthStore } from "../../store/useAuthStore"; // <--- Importamos para el Logout

const Sidebar = () => {
  const location = useLocation()
  const logout = useAuthStore(state => state.logout) // Acción de cerrar sesión

  const isActive = (path) => {
    return location.pathname === path ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
  }

  const menuItems = [
    { path: '/', name: 'Dashboard', icon: LayoutDashboard },
    { path: '/clients', name: 'Clientes', icon: Users },
    { path: '/routines', name: 'Rutinas', icon: ClipboardList },
    { path: '/exercises', name: 'Ejercicios', icon: Dumbbell },
  ]

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0a0a0a] border-r border-gray-800 flex flex-col hidden md:flex">
      {/* Logo */}
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-500 flex items-center gap-2">
          PT Manager <span className="text-xl">🚀</span>
        </h1>
      </div>

      {/* Menú de Navegación */}
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${isActive(item.path)}`}
          >
            <item.icon size={20} />
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Botón Cerrar Sesión */}
      <div className="p-4 border-t border-gray-800">
        <button 
          onClick={logout} // <--- Conectado a Zustand
          className="flex items-center gap-3 px-4 py-3 w-full text-gray-400 hover:text-red-400 hover:bg-red-900/10 rounded-lg transition-colors font-medium"
        >
          <LogOut size={20} />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  )
}

export default Sidebar