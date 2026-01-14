import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, Loader2, Search, CheckCircle, Circle } from 'lucide-react'
import ConfirmModal from '../components/ConfirmModal' 

const CreateRoutine = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()
  
  // Estados para datos externos
  const [clients, setClients] = useState([])
  const [exercises, setExercises] = useState([])
  const [selectedExercises, setSelectedExercises] = useState([]) 
  const [loadingData, setLoadingData] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  // Estado para el Modal de Éxito
  const [showSuccessModal, setShowSuccessModal] = useState(false) // <--- 2. Nuevo estado

  // Cargar Clientes y Ejercicios al iniciar
  useEffect(() => {
    const loadData = async () => {
      try {
        const [resUsers, resExercises] = await Promise.all([
          fetch('http://localhost:3000/api/users'),
          fetch('http://localhost:3000/api/ejercicios')
        ])

        const usersData = await resUsers.json()
        const exercisesData = await resExercises.json()

        if (Array.isArray(usersData)) setClients(usersData)
        if (Array.isArray(exercisesData)) setExercises(exercisesData)

      } catch (error) {
        console.error("Error cargando datos:", error)
        alert("Error al cargar clientes o ejercicios")
      } finally {
        setLoadingData(false)
      }
    }
    loadData()
  }, [])

  // Función para seleccionar/deseleccionar ejercicios
  const toggleExercise = (id) => {
    if (selectedExercises.includes(id)) {
      setSelectedExercises(selectedExercises.filter(exId => exId !== id))
    } else {
      setSelectedExercises([...selectedExercises, id])
    }
  }

  // Enviar al Backend
  const onSubmit = async (data) => {
    if (selectedExercises.length === 0) {
      alert("Por favor, selecciona al menos un ejercicio para la rutina.")
      return
    }

    setIsSubmitting(true)
    try {
      const payload = {
        nombre: data.nombre,
        descripcion: data.descripcion,
        usuarioId: data.usuarioId,
        ejerciciosIDs: selectedExercises 
      }

      const response = await fetch('http://localhost:3000/api/rutinas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        // 3. Activamos el modal en vez de alertar y redirigir
        setShowSuccessModal(true)
      } else {
        const errorData = await response.json()
        alert('Error: ' + (errorData.error || 'No se pudo crear'))
      }
    } catch (error) {
      console.error(error)
      alert('Error de conexión con el servidor')
    } finally {
      setIsSubmitting(false)
    }
  }

  // 4. Función para redirigir al cerrar el modal
  const handleSuccessClose = () => {
    setShowSuccessModal(false)
    navigate('/routines')
  }

  // Filtrar ejercicios visualmente
  const filteredExercises = exercises.filter(ex => 
    ex.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ex.musculo.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loadingData) return <div className="p-10 text-center text-white">Cargando datos...</div>

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-white p-4">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/routines" className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-2xl font-bold">Nueva Rutina</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Sección 1: Datos Básicos y Cliente */}
        <div className="bg-[#111111] p-6 rounded-xl border border-gray-800 space-y-6">
          <h2 className="text-lg font-semibold text-blue-400">1. Información General</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Nombre de la Rutina</label>
              <input 
                {...register("nombre", { required: "Ponle un nombre a la rutina" })}
                placeholder="Ej: Hipertrofia Pecho/Bíceps"
                className="w-full bg-[#1a1a1a] p-3 rounded-lg border border-gray-800 focus:border-blue-500 outline-none"
              />
              {errors.nombre && <span className="text-red-500 text-xs">{errors.nombre.message}</span>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Asignar a Cliente</label>
              <select 
                {...register("usuarioId", { required: "Debes seleccionar un cliente" })}
                className="w-full bg-[#1a1a1a] p-3 rounded-lg border border-gray-800 focus:border-blue-500 outline-none"
              >
                <option value="">Seleccionar cliente...</option>
                {clients.map(client => (
                  <option key={client._id} value={client._id}>
                    {client.nombre} ({client.email})
                  </option>
                ))}
              </select>
              {errors.usuarioId && <span className="text-red-500 text-xs">{errors.usuarioId.message}</span>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Descripción (Opcional)</label>
            <textarea 
              {...register("descripcion")}
              placeholder="Instrucciones especiales para el cliente..."
              rows="3"
              className="w-full bg-[#1a1a1a] p-3 rounded-lg border border-gray-800 focus:border-blue-500 outline-none resize-none"
            />
          </div>
        </div>

        {/* Sección 2: Selección de Ejercicios */}
        <div className="bg-[#111111] p-6 rounded-xl border border-gray-800 space-y-6">
          <div className="flex justify-between items-center">
             <h2 className="text-lg font-semibold text-blue-400">2. Seleccionar Ejercicios</h2>
             <span className="text-sm bg-blue-900/30 text-blue-300 px-3 py-1 rounded-full border border-blue-500/30">
               {selectedExercises.length} seleccionados
             </span>
          </div>

          {/* Buscador de ejercicios */}
          <div className="relative">
            <input
                type="text"
                placeholder="Buscar ejercicio..."
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#1a1a1a] p-2 pl-9 rounded-lg border border-gray-800 text-sm focus:border-blue-500 outline-none"
            />
            <Search className="absolute left-3 top-2.5 text-gray-500" size={16} />
          </div>

          {/* Lista de ejercicios */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredExercises.map(ex => {
              const isSelected = selectedExercises.includes(ex._id)
              return (
                <div 
                  key={ex._id}
                  onClick={() => toggleExercise(ex._id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center justify-between group ${
                    isSelected 
                      ? 'bg-blue-900/20 border-blue-500' 
                      : 'bg-[#1a1a1a] border-gray-800 hover:border-gray-600'
                  }`}
                >
                  <div>
                    <h4 className={`font-medium ${isSelected ? 'text-blue-300' : 'text-gray-300'}`}>{ex.nombre}</h4>
                    <p className="text-xs text-gray-500">{ex.musculo} • {ex.series}x{ex.repeticiones}</p>
                  </div>
                  {isSelected 
                    ? <CheckCircle size={20} className="text-blue-500" />
                    : <Circle size={20} className="text-gray-600 group-hover:text-gray-400" />
                  }
                </div>
              )
            })}
            
            {filteredExercises.length === 0 && (
                <p className="col-span-full text-center text-gray-500 py-4">No se encontraron ejercicios.</p>
            )}
          </div>
        </div>

        {/* Botón Submit */}
        <div className="flex justify-end">
          <button 
            disabled={isSubmitting}
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : <Save size={20} />}
            {isSubmitting ? 'Guardando...' : 'Crear Rutina'}
          </button>
        </div>

      </form>

      {/* 5. Renderizar el Modal al final */}
      <ConfirmModal 
        isOpen={showSuccessModal}
        onClose={handleSuccessClose}
        onConfirm={handleSuccessClose}
        title="¡Rutina Creada!"
        message="La rutina se ha asignado correctamente al cliente seleccionado."
        type="success"
      />
    </div>
  )
}

export default CreateRoutine