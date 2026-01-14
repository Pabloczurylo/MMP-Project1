import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'
import { useState } from 'react'
import ConfirmModal from '../components/ConfirmModal' 

const ExerciseForm = () => {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false) // <--- 2. Estado para el modal de éxito
  
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('http://localhost:3000/api/ejercicios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        // 3. ¡Éxito! Mostramos el modal en lugar del alert feo
        setShowSuccessModal(true)
      } else {
        const errorData = await response.json()
        alert('Error: ' + (errorData.error || 'No se pudo guardar'))
      }
    } catch (error) {
      console.error('Error de red:', error)
      alert('Error al conectar con el servidor. ¿Está corriendo el backend?')
    } finally {
      setIsSubmitting(false)
    }
  }

  // 4. Esta función se ejecuta al cerrar el modal de éxito
  const handleCloseModal = () => {
    setShowSuccessModal(false)
    navigate('/exercises') // Ahora sí nos vamos a la lista
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 text-white p-4">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/exercises" className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-2xl font-bold">Nuevo Ejercicio</h1>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit(onSubmit)} className="bg-[#111111] p-6 rounded-xl border border-gray-800 space-y-6">
        
        {/* Nombre */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-400">Nombre del Ejercicio</label>
          <input 
            {...register("nombre", { required: "El nombre es obligatorio" })}
            placeholder="Ej: Press de Banca"
            className="w-full bg-[#1a1a1a] p-3 rounded-lg border border-gray-800 focus:border-blue-500 outline-none"
          />
          {errors.nombre && <span className="text-red-500 text-sm">{errors.nombre.message}</span>}
        </div>

        {/* Músculo */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-400">Grupo Muscular</label>
          <select 
            {...register("musculo", { required: "Selecciona un músculo" })}
            className="w-full bg-[#1a1a1a] p-3 rounded-lg border border-gray-800 focus:border-blue-500 outline-none"
          >
            <option value="">Seleccionar...</option>
            <option value="Pecho">Pecho</option>
            <option value="Espalda">Espalda</option>
            <option value="Piernas">Piernas</option>
            <option value="Brazos">Brazos</option>
            <option value="Hombros">Hombros</option>
            <option value="Core">Core</option>
          </select>
          {errors.musculo && <span className="text-red-500 text-sm">{errors.musculo.message}</span>}
        </div>

        {/* Series y Repeticiones */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-400">Series</label>
            <input 
              type="number"
              {...register("series", { required: "Requerido" })}
              placeholder="Ej: 4"
              className="w-full bg-[#1a1a1a] p-3 rounded-lg border border-gray-800 focus:border-blue-500 outline-none"
            />
             {errors.series && <span className="text-red-500 text-sm">{errors.series.message}</span>}
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-400">Repeticiones</label>
            <input 
              type="text" 
              {...register("repeticiones", { required: "Requerido" })}
              placeholder="Ej: 12"
              className="w-full bg-[#1a1a1a] p-3 rounded-lg border border-gray-800 focus:border-blue-500 outline-none"
            />
             {errors.repeticiones && <span className="text-red-500 text-sm">{errors.repeticiones.message}</span>}
          </div>
        </div>

        {/* Descanso y Video */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">Descanso (segundos)</label>
                <input 
                type="text"
                {...register("descanso")}
                placeholder="Ej: 60"
                className="w-full bg-[#1a1a1a] p-3 rounded-lg border border-gray-800 focus:border-blue-500 outline-none"
                />
            </div>
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">URL del Video (Opcional)</label>
                <input 
                {...register("videoUrl")}
                placeholder="https://youtube.com/..."
                className="w-full bg-[#1a1a1a] p-3 rounded-lg border border-gray-800 focus:border-blue-500 outline-none"
                />
            </div>
        </div>

        {/* Botón Guardar */}
        <button 
          disabled={isSubmitting}
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-bold transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? <Loader2 className="animate-spin" /> : <Save size={20} />}
          {isSubmitting ? 'Guardando...' : 'Guardar Ejercicio'}
        </button>
      </form>

      {/* 5. Renderizamos el Modal de Éxito al final */}
      <ConfirmModal 
        isOpen={showSuccessModal}
        onClose={handleCloseModal}     // Si cierra con la X
        onConfirm={handleCloseModal}   // Si cierra con el botón "Entendido"
        title="¡Excelente!"
        message="El ejercicio ha sido guardado correctamente en la base de datos."
        type="success"
      />
    </div>
  )
}

export default ExerciseForm