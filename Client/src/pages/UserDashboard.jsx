import { useEffect, useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Calendar, Dumbbell, TrendingUp } from 'lucide-react'

const UserDashboard = () => {
  const { user } = useAuthStore()
  const [myRoutine, setMyRoutine] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMyRoutine = async () => {
      if (!user?._id) return

      try {
        // Nota: Idealmente el backend debería tener un endpoint /api/rutinas?userId=...
        // Por ahora traemos todas y filtramos en el cliente (funciona bien para empezar)
        const res = await fetch('http://localhost:3000/api/rutinas')
        const data = await res.json()

        if (Array.isArray(data)) {
          // Buscamos la rutina que pertenezca a este usuario (la más reciente si hay varias)
          // Asumimos que la última creada es la vigente, o buscamos por ID directo
          const found = data.filter(r => r.usuarioId === user._id).pop() 
          setMyRoutine(found)
        }
      } catch (error) {
        console.error("Error buscando rutina:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMyRoutine()
  }, [user])
  
  return (
    <div className="text-white p-4 md:p-8 animate-in fade-in duration-500">
      <div className="max-w-4xl mx-auto">
        
        {/* Encabezado de Bienvenida */}
        <div className="bg-gradient-to-r from-gray-900 to-[#111111] rounded-2xl p-8 border border-gray-800 mb-8 flex justify-between items-center">
          <div>
             <h1 className="text-3xl font-bold mb-2">Hola, {user?.nombre} 👋</h1>
             <p className="text-gray-400">Bienvenido a tu panel de entrenamiento.</p>
          </div>
        </div>

        {/* Sección Principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Tarjeta: Mi Plan Actual */}
          <div className="bg-[#111111] p-6 rounded-2xl border border-gray-800 flex flex-col justify-between min-h-[200px]">
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <Dumbbell className="text-blue-500" size={24} />
                    <h2 className="text-xl font-bold text-white">Mi Plan Actual</h2>
                </div>
                
                {loading ? (
                    <p className="text-gray-500 animate-pulse">Buscando tu plan...</p>
                ) : myRoutine ? (
                    <div className="space-y-4">
                        <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-800">
                           <p className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">Nombre de la Rutina</p>
                           <p className="text-2xl font-bold text-white">{myRoutine.nombre}</p>
                        </div>
                        
                        {myRoutine.descripcion && (
                             <div className="p-3 bg-gray-900/30 rounded-lg">
                                <p className="text-gray-400 text-sm italic">"{myRoutine.descripcion}"</p>
                             </div>
                        )}
                        
                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                            <span className="bg-blue-500/10 text-blue-400 px-2 py-1 rounded text-xs">
                                {myRoutine.ejerciciosIDs?.length || 0} Ejercicios
                            </span>
                        </div>
                    </div>
                ) : (
                    <div className="p-4 bg-yellow-900/10 border border-yellow-500/20 rounded-xl text-center">
                        <p className="text-yellow-500 font-medium">No tienes rutinas asignadas</p>
                        <p className="text-sm text-gray-400 mt-1">Pídele a tu entrenador que te asigne un plan.</p>
                    </div>
                )}
            </div>
          </div>

          {/* Tarjeta: Próxima Sesión (Placeholder visual) */}
          <div className="bg-[#111111] p-6 rounded-2xl border border-gray-800 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-32 bg-purple-600/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
            
            <div className="flex items-center gap-2 mb-4 relative z-10">
                <Calendar className="text-purple-500" size={24} />
                <h2 className="text-xl font-bold text-white">Próximo Entrenamiento</h2>
            </div>

            <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-800 relative z-10">
                <p className="text-purple-400 text-xs font-bold uppercase tracking-wider mb-1">Sugerencia</p>
                <p className="text-lg font-medium text-white">Continuar con tu rutina</p>
                <p className="text-sm text-gray-500 mt-2">Recuerda registrar tus pesos.</p>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-gray-900/30 border border-gray-800 relative z-10">
                 <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Progreso Semanal</span>
                    <span className="text-sm text-white font-bold">0%</span>
                 </div>
                 <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-purple-600 h-full w-[2%]"></div>
                 </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default UserDashboard