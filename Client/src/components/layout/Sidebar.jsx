import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Users, LogOut, X, Dumbbell, ClipboardList } from 'lucide-react' 

// Recibimos "isOpen" y "toggleSidebar" desde el Layout
const Sidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Users, label: 'Clientes', path: '/clients' },
    { icon: ClipboardList, label: 'Rutinas', path: '/routines' }, 
    { icon: Dumbbell, label: 'Ejercicios', path: '/exercises' },
  ]

  return (
    <>
      {/* Overlay oscuro para fondo en móvil (solo visible si está abierto) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Principal */}
      <aside 
        className={`
          fixed top-0 left-0 h-screen w-64 bg-gray-900 border-r border-gray-800 z-50 transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
        `}
      >
        {/* Logo / Título */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-800">
          <h1 className="text-xl font-bold text-blue-500">PT Manager 🚀</h1>
          {/* Botón Cerrar (Solo móvil) */}
          <button onClick={toggleSidebar} className="md:hidden text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Menú de Navegación */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => toggleSidebar()} // Cierra el menú al hacer click en móvil
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`
              }
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Botón de Salir */}
        <div className="p-4 border-t border-gray-800">
          <button className="flex items-center gap-3 text-gray-400 hover:text-red-400 w-full px-4 py-3 transition-colors">
            <LogOut size={20} />
            <span className="font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar