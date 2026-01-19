import { useAuthStore } from '../store/useAuthStore'

const UserDashboard = () => {
  const { user } = useAuthStore()
  
  return (
    <div className="text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Encabezado de Bienvenida */}
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 mb-8">
          <h1 className="text-3xl font-bold mb-2">Hola, {user?.nombre} 👋</h1>
          <p className="text-gray-400">Bienvenido a tu panel de entrenamiento.</p>
        </div>

        {/* Sección de Rutina Actual (Placeholder) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#111111] p-6 rounded-2xl border border-gray-800">
            <h2 className="text-xl font-bold text-blue-500 mb-4">Mi Plan Actual</h2>
            <div className="space-y-4">
               <div className="p-4 bg-gray-900/50 rounded-xl">
                  <p className="text-gray-400 text-sm">Objetivo</p>
                  <p className="text-white font-medium">{user?.plan || 'Sin plan asignado'}</p>
               </div>
               
               <div className="p-4 bg-gray-900/50 rounded-xl border border-blue-500/20">
                  <p className="text-gray-400 text-sm">Rutina de hoy</p>
                  <p className="text-white font-medium">Día 1: Pecho y Tríceps</p>
               </div>
            </div>
          </div>

          <div className="bg-[#111111] p-6 rounded-2xl border border-gray-800">
            <h2 className="text-xl font-bold text-purple-500 mb-4">Progreso</h2>
            <p className="text-gray-400">Gráficos de tus avances próximamente...</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard