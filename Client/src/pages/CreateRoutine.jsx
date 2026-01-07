import { useForm } from 'react-hook-form'
import { Dumbbell, Users, BarChart, FileText, Save, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

const CreateRoutine = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()

  const onSubmit = (data) => {
    console.log("Nueva Rutina:", data)
    alert("Rutina creada (simulado)")
    navigate('/dashboard')
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Encabezado */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Diseñar Rutina</h1>
          <p className="text-gray-400 mt-1">Configura los detalles generales del plan de entrenamiento.</p>
        </div>
        <Link 
          to="/dashboard"
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
        >
          <X size={24} />
        </Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Tarjeta Principal */}
        <div className="bg-[#111111] p-6 rounded-2xl border border-gray-800/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Nombre de la Rutina */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Dumbbell size={16} className="text-purple-500"/>
                Nombre de la Rutina
              </label>
              <input
                {...register("routineName", { required: "El nombre es obligatorio" })}
                type="text"
                className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl p-3 text-white focus:border-purple-500 outline-none transition-all"
                placeholder="Ej: Hipertrofia Pectoral - Fase 1"
              />
              {errors.routineName && <span className="text-red-500 text-xs">{errors.routineName.message}</span>}
            </div>

            {/* Asignar a Cliente */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Users size={16} className="text-blue-500"/>
                Asignar a Cliente
              </label>
              <select 
                {...register("clientId", { required: "Debes seleccionar un cliente" })}
                className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl p-3 text-white focus:border-purple-500 outline-none transition-all appearance-none cursor-pointer"
              >
                <option value="">Seleccionar cliente...</option>
                {/* Estos datos vendrán de la base de datos después */}
                <option value="1">Juan Pérez</option>
                <option value="2">María Gonzalez</option>
                <option value="3">Carlos Ruiz</option>
              </select>
              {errors.clientId && <span className="text-red-500 text-xs">{errors.clientId.message}</span>}
            </div>

            {/* Nivel de Dificultad */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <BarChart size={16} className="text-green-500"/>
                Nivel de Dificultad
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Principiante', 'Intermedio', 'Avanzado'].map((level) => (
                  <label key={level} className="cursor-pointer">
                    <input 
                      type="radio" 
                      value={level} 
                      {...register("difficulty", { required: true })}
                      className="peer sr-only"
                    />
                    <div className="text-center py-2 rounded-lg bg-[#1a1a1a] border border-gray-800 text-gray-400 peer-checked:bg-purple-600 peer-checked:text-white peer-checked:border-purple-500 transition-all text-sm font-medium hover:bg-gray-800">
                      {level}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Duración Estimada */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Duración (Semanas)</label>
              <input
                {...register("duration", { required: true, min: 1 })}
                type="number"
                className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl p-3 text-white focus:border-purple-500 outline-none transition-all"
                placeholder="4"
              />
            </div>

          </div>

          {/* Descripción / Notas */}
          <div className="mt-6 space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <FileText size={16} className="text-gray-400"/>
              Descripción / Enfoque
            </label>
            <textarea
              {...register("description")}
              rows="4"
              className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl p-3 text-white focus:border-purple-500 outline-none transition-all resize-none"
              placeholder="Ej: Enfoque en fuerza máxima con descansos largos..."
            ></textarea>
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="flex justify-end gap-4 pt-4">
          <Link 
            to="/dashboard"
            className="px-6 py-3 rounded-xl border border-gray-700 text-gray-300 font-medium hover:bg-gray-800 transition-colors"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700 transition-colors flex items-center gap-2 shadow-lg shadow-purple-900/20"
          >
            <Save size={20} />
            Crear Rutina
          </button>
        </div>

      </form>
    </div>
  )
}

export default CreateRoutine