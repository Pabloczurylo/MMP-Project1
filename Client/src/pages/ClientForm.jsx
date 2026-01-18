import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { User, Mail, Phone, Target, FileText, Save, X } from 'lucide-react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

const ClientForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const navigate = useNavigate()
  const location = useLocation()
  
  // URL base de tu servidor
  const API_URL = 'http://localhost:3000/api/users'
  
  const queryParams = new URLSearchParams(location.search)
  const clientId = queryParams.get('id')
  const isEditing = Boolean(clientId)

  // 1. Cargar datos del cliente desde el Back-End si estamos editando
  useEffect(() => {
    if (!isEditing) return

    const fetchClientData = async () => {
      try {
        
        const response = await fetch(`${API_URL}/`) 
        const clients = await response.json()
        
        // Buscamos por _id (Mongo) o id (Front)
        const client = clients.find(c => String(c._id || c.id) === String(clientId))

        if (client) {
          // Mapeo inverso de planes para el formulario
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

  // 2. Enviar datos al Back-End (Crear o Editar)
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
      password: '123456',    
      phone: data.phone,
      age: data.age,
      plan: planMap[data.goal],
      notes: data.notes,
      status: 'Activo'
    }

    try {
      let response
      if (isEditing) {
        // 3. Actualización (PUT)
        response = await fetch(`${API_URL}/${clientId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(clientPayload)
        })
      } else {
        // 4. Registro Nuevo (POST)
        
        // Si tu backend usa /register para crear, déjalo así. Si usa la raíz /, quita "register".
        response = await fetch(`${API_URL}/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(clientPayload)
        })
      }

      if (response.ok) {
        alert(isEditing ? 'Cliente actualizado en MongoDB' : 'Cliente registrado en MongoDB')
        navigate('/clients')
      } else {
        const err = await response.json()
        
        alert(`Error: ${err.message || err.error || 'No se pudo guardar'}`)
      }
    } catch (error) {
      console.error(error)
      alert("Error crítico de conexión con el servidor")
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">{isEditing ? 'Editar Cliente' : 'Nuevo Cliente'}</h1>
          <p className="text-gray-400 mt-1">Conectado a la base de datos real.</p>
        </div>
        <Link to="/clients" className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg">
          <X size={24} />
        </Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-[#111111] p-6 rounded-2xl border border-gray-800/50">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <User className="text-blue-500" size={20} />
            Información Personal
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
              <label className="text-sm font-medium text-gray-300">Email</label>
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