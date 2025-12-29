import { Save, X, User, Mail, Phone, Target, Dumbbell, Ruler, Weight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Card from '../components/ui/Card'

const ClientForm = () => {
  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Nuevo Cliente</h1>
          <p className="text-gray-400">Registra la información inicial de tu alumno.</p>
        </div>
        <div className="flex gap-3">
          <Link 
            to="/clients"
            className="px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors flex items-center gap-2"
          >
            <X size={20} />
            Cancelar
          </Link>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors">
            <Save size={20} />
            Guardar Cliente
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Columna 1: Datos Personales */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <User className="text-blue-500" size={20} />
            Datos Personales
          </h2>
          <Card className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Nombre Completo</label>
              <input 
                type="text" 
                placeholder="Ej: Juan Pérez"
                className="w-full bg-gray-950 border border-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1 flex items-center gap-1">
                  <Mail size={14} /> Email
                </label>
                <input 
                  type="email" 
                  placeholder="juan@email.com"
                  className="w-full bg-gray-950 border border-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1 flex items-center gap-1">
                  <Phone size={14} /> Teléfono
                </label>
                <input 
                  type="tel" 
                  placeholder="+54 9 11..."
                  className="w-full bg-gray-950 border border-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Columna 2: Objetivo y Físico */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Dumbbell className="text-purple-500" size={20} />
            Objetivos y Físico
          </h2>
          <Card className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1 flex items-center gap-1">
                <Target size={14} /> Plan / Objetivo Principal
              </label>
              <select className="w-full bg-gray-950 border border-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                <option value="">Seleccionar Plan...</option>
                <option value="peruida_peso">Pérdida de Peso</option>
                <option value="hipertrofia">Hipertrofia Muscular</option>
                <option value="fuerza">Ganancia de Fuerza</option>
                <option value="resistencia">Resistencia / Cardio</option>
                <option value="rehabilitacion">Rehabilitación</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1 flex items-center gap-1">
                  <Weight size={14} /> Peso (kg)
                </label>
                <input 
                  type="number" 
                  placeholder="0.0"
                  className="w-full bg-gray-950 border border-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1 flex items-center gap-1">
                  <Ruler size={14} /> Altura (cm)
                </label>
                <input 
                  type="number" 
                  placeholder="0"
                  className="w-full bg-gray-950 border border-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Notas / Lesiones</label>
              <textarea 
                rows="3"
                placeholder="Ej: Dolor en rodilla izquierda..."
                className="w-full bg-gray-950 border border-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              ></textarea>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ClientForm