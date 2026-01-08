import { useForm } from 'react-hook-form'
import { Dumbbell, Save, X, Youtube, Activity, Layers } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

const ExerciseForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()

  const onSubmit = (data) => {
    console.log("Nuevo Ejercicio:", data)
    // Aquí iría la lógica para guardar el ejercicio en el backend
    alert("Ejercicio guardado (simulado)")
    navigate('/exercises') // Volvemos a la lista
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Encabezado */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Nuevo Ejercicio</h1>
          <p className="text-gray-400 mt-1">Agrega un nuevo movimiento a la biblioteca.</p>
        </div>
        <Link 
          to="/exercises"
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
        >
          <X size={24} />
        </Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        <div className="bg-[#111111] p-6 rounded-2xl border border-gray-800/50 space-y-6">
          
          {/* Nombre del Ejercicio */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Dumbbell size={16} className="text-blue-500"/>
              Nombre del Ejercicio
            </label>
            <input
              {...register("name", { required: "El nombre es obligatorio" })}
              type="text"
              className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl p-3 text-white focus:border-blue-500 outline-none transition-all"
              placeholder="Ej: Press de Banca Inclinado"
            />
            {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Grupo Muscular */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Activity size={16} className="text-purple-500"/>
                Grupo Muscular Principal
              </label>
              <select 
                {...register("muscle", { required: "Selecciona un músculo" })}
                className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl p-3 text-white focus:border-purple-500 outline-none transition-all appearance-none cursor-pointer"
              >
                <option value="">Seleccionar...</option>
                <option value="Pecho">Pecho</option>
                <option value="Espalda">Espalda</option>
                <option value="Piernas">Piernas</option>
                <option value="Hombros">Hombros</option>
                <option value="Brazos">Brazos</option>
                <option value="Core">Core (Abdominales)</option>
                <option value="Cardio">Cardio / Resistencia</option>
              </select>
              {errors.muscle && <span className="text-red-500 text-xs">{errors.muscle.message}</span>}
            </div>

            {/* Equipamiento */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Layers size={16} className="text-green-500"/>
                Equipamiento Necesario
              </label>
              <select 
                {...register("equipment", { required: "Selecciona el equipo" })}
                className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl p-3 text-white focus:border-green-500 outline-none transition-all appearance-none cursor-pointer"
              >
                <option value="">Seleccionar...</option>
                <option value="Barra">Barra</option>
                <option value="Mancuernas">Mancuernas</option>
                <option value="Maquina">Máquina / Polea</option>
                <option value="Peso Corporal">Peso Corporal</option>
                <option value="Kettlebell">Kettlebell (Pesa Rusa)</option>
                <option value="Elásticos">Bandas Elásticas</option>
              </select>
              {errors.equipment && <span className="text-red-500 text-xs">{errors.equipment.message}</span>}
            </div>
          </div>

          {/* Link de Video (Opcional) */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Youtube size={16} className="text-red-500"/>
              Link de Video Tutorial (Opcional)
            </label>
            <input
              {...register("videoUrl")}
              type="url"
              className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl p-3 text-white focus:border-red-500 outline-none transition-all placeholder:text-gray-600"
              placeholder="https://youtube.com/..."
            />
          </div>

        </div>

        {/* Botones */}
        <div className="flex justify-end gap-4 pt-4">
          <Link 
            to="/exercises"
            className="px-6 py-3 rounded-xl border border-gray-700 text-gray-300 font-medium hover:bg-gray-800 transition-colors"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg shadow-blue-900/20"
          >
            <Save size={20} />
            Guardar Ejercicio
          </button>
        </div>

      </form>
    </div>
  )
}

export default ExerciseForm