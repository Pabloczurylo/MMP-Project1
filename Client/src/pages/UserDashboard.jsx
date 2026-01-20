import { useEffect, useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Calendar, Dumbbell, TrendingUp, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom' // <--- IMPORTANTE: Necesario para navegar

const UserDashboard = () => {
  const { user } = useAuthStore()
  const [myRoutine, setMyRoutine] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate() // <--- IMPORTANTE: Inicializamos la navegación

  useEffect(() => {
    const fetchMyRoutine = async () => {
      if (!user?._id) return

      try {
        const res = await fetch('http://localhost:3000/api/rutinas')
        const data = await res.json()

        if (Array.isArray(data)) {
          // Buscamos la rutina de este usuario
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
        
        {/* Encabezado */}
        <div className="bg-gradient-to-r from-gray-900 to-[#111111] rounded-2xl p-8 border border-gray-800 mb-8 flex justify-between items-center">
          <div>
             <h1 className="text-3xl font-bold mb-2">Hola, {user?.nombre} 👋</h1>
             <p className="text-gray-400">Bienvenido a tu panel de entrenamiento.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* --- TARJETA PRINCIPAL (Aquí está el cambio) --- */}
          <div className="bg-[#111111] p-6 rounded-2xl border border-gray-800 flex flex-col justify-between min-h-[200px]">
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <Dumbbell className="text-blue-500" size={24} />
                    <h2 className="text-xl font-bold text-white">Mi Plan Actual</h2>
                </div>
                
                {loading ? (
                    <p className="text-gray-500 animate-pulse">Buscando tu plan...</p>
                ) : myRoutine ? (
                    <div className="p-5 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <p className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">Rutina Asignada</p>
                                <p className="text-xl font-bold text-white capitalize leading-tight mb-1">{myRoutine.nombre}</p>
                            </div>
                        </div>
                        
                        {myRoutine.descripcion && (
                                <p className="text-gray-400 text-sm mb-4 line-clamp-2 italic">"{myRoutine.descripcion}"</p>
                        )}
                        
                        {/* --- EL BOTÓN QUE FALTABA 👇 --- */}
                        <button 
                            onClick={() => navigate('/rutina', { state: { routine: myRoutine } })}
                            className="w-full bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 group shadow-lg shadow-blue-900/20"
                        >
                            <span>Ver Ejercicios</span>
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                        </button>
                    </div>
                ) : (
                    <div className="p-4 bg-yellow-900/10 border border-yellow-500/20 rounded-xl text-center">
                        <p className="text-yellow-500 font-medium">No tienes rutinas asignadas</p>
                        <p className="text-sm text-gray-400 mt-1">Pídele a tu entrenador que te asigne un plan.</p>
                    </div>
                )}
            </div>
          </div>

          {/* Tarjeta Secundaria (Placeholder) */}
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