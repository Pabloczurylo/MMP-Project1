import { useState } from 'react'
import { Save, Plus, Trash2, Dumbbell, User, Search, X, Clock, Repeat } from 'lucide-react'
import Card from '../components/ui/Card'

const CreateRoutine = () => {
  // Estados para manejar los datos
  const [routineName, setRoutineName] = useState('')
  const [selectedClient, setSelectedClient] = useState('')
  const [addedExercises, setAddedExercises] = useState([]) // Lista de ejercicios en la rutina
  const [showExerciseSelector, setShowExerciseSelector] = useState(false) // Controla si vemos el selector

  // Datos Simulados (Mock Data)
  const clients = [
    { id: 1, name: "Facundo Sorane" },
    { id: 2, name: "Matías Saravia" },
    { id: 3, name: "Maxi Prieto" },
  ]

  const availableExercises = [
    { id: 1, title: "Sentadilla con Barra", muscle: "Piernas" },
    { id: 2, title: "Press de Banca", muscle: "Pecho" },
    { id: 3, title: "Dominadas", muscle: "Espalda" },
    { id: 4, title: "Curl de Bíceps", muscle: "Brazos" },
  ]

  // Funciones Helper
  const handleAddExercise = (exercise) => {
    // Agregamos el ejercicio con campos vacíos para series/reps
    setAddedExercises([
      ...addedExercises, 
      { ...exercise, uniqueId: Date.now(), sets: 3, reps: '10-12', rest: '60s' }
    ])
    setShowExerciseSelector(false)
  }

  const handleRemoveExercise = (uniqueId) => {
    setAddedExercises(addedExercises.filter(ex => ex.uniqueId !== uniqueId))
  }

  const handleUpdateExercise = (uniqueId, field, value) => {
    setAddedExercises(addedExercises.map(ex => 
      ex.uniqueId === uniqueId ? { ...ex, [field]: value } : ex
    ))
  }

  return (
    <div className="space-y-6 relative">
      
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Nueva Rutina</h1>
          <p className="text-gray-400">Diseña el entrenamiento para tu cliente.</p>
        </div>
        <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors">
          <Save size={20} />
          Guardar Rutina
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* COLUMNA IZQUIERDA: Configuración General (1/3 del ancho) */}
        <div className="space-y-6 lg:col-span-1">
          <Card className="space-y-4">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <User className="text-blue-500" size={18} />
              Asignar a
            </h3>
            <select 
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              className="w-full bg-gray-950 border border-gray-800 text-white px-4 py-3 rounded-lg focus:border-blue-500 outline-none"
            >
              <option value="">Seleccionar Cliente...</option>
              {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>

            <div className="pt-2">
              <label className="block text-sm font-medium text-gray-400 mb-1">Nombre de la Rutina</label>
              <input 
                type="text" 
                placeholder="Ej: Pierna Hipertrofia - Fase 1"
                value={routineName}
                onChange={(e) => setRoutineName(e.target.value)}
                className="w-full bg-gray-950 border border-gray-800 text-white px-4 py-3 rounded-lg focus:border-blue-500 outline-none"
              />
            </div>
          </Card>
        </div>

        {/* COLUMNA DERECHA: Constructor de Ejercicios (2/3 del ancho) */}
        <div className="space-y-6 lg:col-span-2">
          
          {/* Lista de Ejercicios Agregados */}
          <div className="space-y-4">
            {addedExercises.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-gray-800 rounded-xl bg-gray-900/50">
                <Dumbbell className="mx-auto h-12 w-12 text-gray-600 mb-3" />
                <h3 className="text-lg font-medium text-gray-300">La rutina está vacía</h3>
                <p className="text-gray-500">Agrega ejercicios para comenzar a diseñar.</p>
              </div>
            ) : (
              addedExercises.map((exercise, index) => (
                <Card key={exercise.uniqueId} className="relative group">
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-4 border-b border-gray-800 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-600/20 text-blue-500 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                      <h4 className="font-bold text-white text-lg">{exercise.title}</h4>
                      <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded border border-gray-700">
                        {exercise.muscle}
                      </span>
                    </div>
                    <button 
                      onClick={() => handleRemoveExercise(exercise.uniqueId)}
                      className="text-gray-500 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {/* Inputs de Configuración */}
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block flex items-center gap-1">
                        <Repeat size={10} /> Series
                      </label>
                      <input 
                        type="number" 
                        value={exercise.sets}
                        onChange={(e) => handleUpdateExercise(exercise.uniqueId, 'sets', e.target.value)}
                        className="w-full bg-gray-950 border border-gray-800 text-white px-3 py-2 rounded text-sm text-center focus:border-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block flex items-center gap-1">
                        <Dumbbell size={10} /> Reps
                      </label>
                      <input 
                        type="text" 
                        value={exercise.reps}
                        onChange={(e) => handleUpdateExercise(exercise.uniqueId, 'reps', e.target.value)}
                        className="w-full bg-gray-950 border border-gray-800 text-white px-3 py-2 rounded text-sm text-center focus:border-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block flex items-center gap-1">
                        <Clock size={10} /> Descanso
                      </label>
                      <input 
                        type="text" 
                        value={exercise.rest}
                        onChange={(e) => handleUpdateExercise(exercise.uniqueId, 'rest', e.target.value)}
                        className="w-full bg-gray-950 border border-gray-800 text-white px-3 py-2 rounded text-sm text-center focus:border-blue-500 outline-none"
                      />
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>

          {/* Botón para abrir el selector (Modal simulado) */}
          <button 
            onClick={() => setShowExerciseSelector(true)}
            className="w-full py-4 border-2 border-dashed border-gray-700 rounded-xl text-gray-400 hover:text-white hover:border-gray-500 hover:bg-gray-800/50 transition-all flex items-center justify-center gap-2 font-medium"
          >
            <Plus size={20} />
            Agregar Ejercicio
          </button>
        </div>
      </div>

      {/* MODAL / SELECTOR DE EJERCICIOS */}
      {showExerciseSelector && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-800 w-full max-w-lg rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-800/50">
              <h3 className="font-bold text-white">Seleccionar Ejercicio</h3>
              <button onClick={() => setShowExerciseSelector(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4 border-b border-gray-800">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  type="text" 
                  placeholder="Buscar..." 
                  className="w-full bg-gray-950 border border-gray-700 text-white pl-9 pr-4 py-2 rounded-lg text-sm focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="overflow-y-auto p-2 space-y-1 flex-1">
              {availableExercises.map(ex => (
                <button 
                  key={ex.id}
                  onClick={() => handleAddExercise(ex)}
                  className="w-full text-left p-3 hover:bg-gray-800 rounded-lg flex justify-between items-center group transition-colors"
                >
                  <div>
                    <span className="block text-white font-medium">{ex.title}</span>
                    <span className="text-xs text-gray-500">{ex.muscle}</span>
                  </div>
                  <Plus size={18} className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default CreateRoutine