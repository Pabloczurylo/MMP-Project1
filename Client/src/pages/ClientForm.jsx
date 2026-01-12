import { useForm } from 'react-hook-form'
import { User, Mail, Phone, Target, FileText, Save, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

const ClientForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()

  const onSubmit = (data) => {
    // Guardar en localStorage para simular persistencia y mostrarse en la tabla
    const stored = localStorage.getItem('clients')
    const clients = stored ? JSON.parse(stored) : []
    const nextId = clients.length ? Math.max(...clients.map(c => c.id)) + 1 : 1

    const planMap = {
      perdida_peso: 'Pérdida de Peso',
      hipertrofia: 'Hipertrofia',
      resistencia: 'Resistencia / Cardio',
      fuerza: 'Fuerza / Powerlifting',
      salud: 'Salud General'
    }

    const newClient = {
      id: nextId,
      name: data.fullName,
      plan: planMap[data.goal] || data.goal || 'General',
      status: 'Activo',
      email: data.email || '',
      phone: data.phone || ''
    }

    // Añadir al inicio de la lista
    clients.unshift(newClient)
    localStorage.setItem('clients', JSON.stringify(clients))

    alert('Cliente registrado')
    navigate('/clients')
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Encabezado */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Nuevo Cliente</h1>
          <p className="text-gray-400 mt-1">Registra los datos personales y objetivos.</p>
        </div>
        <Link 
          to="/dashboard"
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
        >
          <X size={24} />
        </Link>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Tarjeta de Datos Personales */}
        <div className="bg-[#111111] p-6 rounded-2xl border border-gray-800/50">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <User className="text-blue-500" size={20} />
            Información Personal
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nombre Completo */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Nombre Completo</label>
              <input
                {...register("fullName", { required: "El nombre es obligatorio" })}
                type="text"
                className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                placeholder="Ej: Juan Pérez"
              />
              {errors.fullName && <span className="text-red-500 text-xs">{errors.fullName.message}</span>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Email</label>
              <div className="relative">
                <input
                  {...register("email", { 
                    required: "El email es obligatorio",
                    pattern: { value: /^\S+@\S+$/i, message: "Email inválido" }
                  })}
                  type="email"
                  className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl p-3 pl-10 text-white focus:border-blue-500 outline-none transition-all"
                  placeholder="juan@email.com"
                />
                <Mail className="absolute left-3 top-3.5 text-gray-500" size={18} />
              </div>
              {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
            </div>

            {/* Teléfono */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Teléfono</label>
              <div className="relative">
                <input
                  {...register("phone", { required: "El teléfono es requerido" })}
                  type="tel"
                  className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl p-3 pl-10 text-white focus:border-blue-500 outline-none transition-all"
                  placeholder="+54 9 11..."
                />
                <Phone className="absolute left-3 top-3.5 text-gray-500" size={18} />
              </div>
            </div>

            {/* Edad */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Edad</label>
              <input
                {...register("age", { required: true, min: 14, max: 100 })}
                type="number"
                className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl p-3 text-white focus:border-blue-500 outline-none transition-all"
                placeholder="25"
              />
            </div>
          </div>
        </div>

        {/* Tarjeta de Objetivos */}
        <div className="bg-[#111111] p-6 rounded-2xl border border-gray-800/50">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Target className="text-purple-500" size={20} />
            Objetivos Fitness
          </h2>

          <div className="space-y-6">
            {/* Objetivo Principal */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Objetivo Principal</label>
              <select 
                {...register("goal")}
                className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl p-3 text-white focus:border-purple-500 outline-none transition-all appearance-none"
              >
                <option value="perdida_peso">Pérdida de Peso</option>
                <option value="hipertrofia">Ganancia Muscular (Hipertrofia)</option>
                <option value="resistencia">Resistencia / Cardio</option>
                <option value="fuerza">Fuerza / Powerlifting</option>
                <option value="salud">Salud General</option>
              </select>
            </div>

            {/* Notas / Observaciones */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Observaciones / Lesiones</label>
              <div className="relative">
                <textarea
                  {...register("notes")}
                  rows="4"
                  className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl p-3 pl-10 text-white focus:border-purple-500 outline-none transition-all resize-none"
                  placeholder="Ej: Dolor en rodilla izquierda, disponible solo mañanas..."
                ></textarea>
                <FileText className="absolute left-3 top-3.5 text-gray-500" size={18} />
              </div>
            </div>
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
            className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg shadow-blue-900/20"
          >
            <Save size={20} />
            Guardar Cliente
          </button>
        </div>

      </form>
    </div>
  )
}

export default ClientForm