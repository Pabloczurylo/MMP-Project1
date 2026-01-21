import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { User, Mail, Phone, Target, FileText, Save, X, Lock, Eye, EyeOff } from 'lucide-react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import ConfirmModal from '../components/ConfirmModal' // <--- 1. Importar Modal

const ClientForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const navigate = useNavigate()
  const location = useLocation()
  
  const [showPassword, setShowPassword] = useState(false)
  
  // --- 2. Estado para manejar el Modal ---
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'success', // 'success' | 'danger'
    onConfirm: null // La función a ejecutar al darle al botón azul
  })

  const API_URL = 'http://localhost:3000/api/users'
  
  const queryParams = new URLSearchParams(location.search)
  const clientId = queryParams.get('id')
  const isEditing = Boolean(clientId)

  useEffect(() => {
    if (!isEditing) return

    const fetchClientData = async () => {
      try {
        const response = await fetch(`${API_URL}/`) 
        const clients = await response.json()
        const client = clients.find(c => String(c._id || c.id) === String(clientId))

        if (client) {
          const reversePlan = {
            'Pérdida de Peso': 'perdida_peso',
            'Hipertrofia': 'hipertrofia',
            'Resistencia / Cardio': 'resistencia',
            'Fuerza / Powerlifting': 'fuerza',
            'Salud General': 'salud',
          }

          reset({
            fullName: client.nombre,
            email: client.email || '',
            phone: client.phone || '',
            age: client.age || '',
            goal: reversePlan[client.plan] || 'salud',
            notes: client.notes || ''
          })
        }
      } catch (error) {
        console.error("Error al cargar datos del cliente:", error)
      }
    }

    fetchClientData()
  }, [clientId, isEditing, reset])

  const onSubmit = async (data) => {
    const planMap = {
      perdida_peso: 'Pérdida de Peso',
      hipertrofia: 'Hipertrofia',
      resistencia: 'Resistencia / Cardio',
      fuerza: 'Fuerza / Powerlifting',
      salud: 'Salud General'
    }

    const clientPayload = {
      nombre: data.fullName,
      email: data.email,
      phone: data.phone,
      age: data.age,
      plan: planMap[data.goal],
      notes: data.notes,
      status: 'Activo'
    }

    if (data.password) {
        clientPayload.password = data.password;
    } else if (!isEditing) {
        // Error de validación local (Usamos el modal en modo error)
        setModalConfig({
            isOpen: true,
            type: 'danger',
            title: 'Faltan datos',
            message: 'La contraseña es obligatoria para nuevos clientes',
            onConfirm: () => {} // No hace nada, solo cierra
        });
        return;
    }

    try {
      let response
      if (isEditing) {
        response = await fetch(`${API_URL}/${clientId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(clientPayload)
        })
      } else {
        response = await fetch(`${API_URL}/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(clientPayload)
        })
      }

      if (response.ok) {
        // --- 3. ÉXITO: Mostrar Modal Verde y redirigir al confirmar ---
        setModalConfig({
            isOpen: true,
            type: 'success',
            title: isEditing ? '¡Actualización Exitosa!' : '¡Registro Exitoso!',
            message: isEditing 
                ? 'Los datos del cliente han sido actualizados correctamente.' 
                : 'El cliente ha sido registrado en el sistema correctamente.',
            onConfirm: () => navigate('/clients') // <--- Aquí redirigimos
        });

      } else {
        // --- ERROR DE API: Mostrar Modal Rojo ---
        const err = await response.json()
        setModalConfig({
            isOpen: true,
            type: 'danger',
            title: 'Error al guardar',
            message: err.message || err.error || 'No se pudo procesar la solicitud.',
            onConfirm: () => {}
        });
      }
    } catch (error) {
      console.error(error)
      // --- ERROR DE RED ---
      setModalConfig({
        isOpen: true,
        type: 'danger',
        title: 'Error de Conexión',
        message: 'No se pudo conectar con el servidor. Intenta nuevamente.',
        onConfirm: () => {}
      });
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* --- 4. Renderizar el Modal --- */}
      <ConfirmModal 
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        message={modalConfig.message}
        type={modalConfig.type}
        onConfirm={modalConfig.onConfirm}
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
      />

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">{isEditing ? 'Editar Cliente' : 'Nuevo Cliente'}</h1>
          <p className="text-gray-400 mt-1">
            {isEditing ? 'Modificar datos o cambiar contraseña.' : 'Registrar un nuevo usuario en el sistema.'}
          </p>
        </div>
        <Link to="/clients" className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg">
          <X size={24} />
        </Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-[#111111] p-6 rounded-2xl border border-gray-800/50">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <User className="text-blue-500" size={20} />
            Información de Cuenta
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Nombre Completo</label>
              <input
                {...register("fullName", { required: "El nombre es obligatorio" })}
                type="text"
                className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl p-3 text-white outline-none focus:border-blue-500"
                placeholder="Juan Pérez"
              />
              {errors.fullName && <span className="text-red-500 text-xs">{errors.fullName.message}</span>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Email (Usuario)</label>
              <div className="relative">
                <input
                  {...register("email", { required: "Email obligatorio" })}
                  type="email"
                  className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl p-3 pl-10 text-white outline-none focus:border-blue-500"
                  placeholder="juan@email.com"
                />
                <Mail className="absolute left-3 top-3.5 text-gray-500" size={18} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                {isEditing ? 'Nueva Contraseña (Opcional)' : 'Asignar Contraseña'}
              </label>
              <div className="relative">
                <input
                  {...register("password", { 
                    required: !isEditing ? "La contraseña es obligatoria para nuevos usuarios" : false,
                    minLength: { value: 8, message: "La contraseña debe tener al menos 8 caracteres" }
                  })}
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl p-3 pl-10 pr-10 text-white outline-none focus:border-blue-500"
                  placeholder={isEditing ? "Dejar vacío para mantener la actual" : "Mínimo 8 caracteres"}
                />
                <Lock className="absolute left-3 top-3.5 text-gray-500" size={18} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-500 hover:text-white transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Teléfono</label>
              <div className="relative">
                <input
                  {...register("phone")}
                  type="tel"
                  className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl p-3 pl-10 text-white outline-none focus:border-blue-500"
                  placeholder="+54..."
                />
                <Phone className="absolute left-3 top-3.5 text-gray-500" size={18} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Edad</label>
              <input
                {...register("age")}
                type="number"
                className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl p-3 text-white outline-none"
              />
            </div>
          </div>
        </div>

        <div className="bg-[#111111] p-6 rounded-2xl border border-gray-800/50">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Target className="text-purple-500" size={20} />
            Objetivos Fitness
          </h2>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Objetivo Principal</label>
              <select 
                {...register("goal")}
                className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl p-3 text-white outline-none focus:border-purple-500"
              >
                <option value="perdida_peso">Pérdida de Peso</option>
                <option value="hipertrofia">Ganancia Muscular</option>
                <option value="resistencia">Resistencia / Cardio</option>
                <option value="fuerza">Fuerza / Powerlifting</option>
                <option value="salud">Salud General</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Observaciones</label>
              <div className="relative">
                <textarea
                  {...register("notes")}
                  rows="4"
                  className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl p-3 pl-10 text-white outline-none resize-none"
                ></textarea>
                <FileText className="absolute left-3 top-3.5 text-gray-500" size={18} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Link to="/clients" className="px-6 py-3 rounded-xl border border-gray-700 text-gray-300 hover:bg-gray-800">
            Cancelar
          </Link>
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 flex items-center gap-2"
          >
            <Save size={20} />
            {isEditing ? 'Actualizar Cliente' : 'Guardar Cliente'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ClientForm