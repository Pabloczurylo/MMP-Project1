import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout' 
import Landing from './pages/Landing'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Clients from './pages/Clients'
import ClientForm from './pages/ClientForm'
// import Exercises from './pages/Exercises' 
import CreateRoutine from './pages/CreateRoutine'
import Routines from './pages/Routines'
import ExercisesList from './pages/ExercisesList'
import ExerciseForm from './pages/ExerciseForm'


function App() {
  return (
    // Quitamos el div wrapper global para que cada página controle su fondo
    <Routes>
      {/* 1. Rutas Públicas (Sin Sidebar) */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />

      {/* 2. Rutas Privadas (Con Sidebar) */}
      {/* Todo lo que esté acá dentro tendrá Sidebar */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Rutas de Clientes */}
        <Route path="/clients" element={<Clients />} />
        <Route path="/clients/new" element={<ClientForm />} />
        
        {/* Rutas de Ejercicios */}
        <Route path="/exercises" element={<ExercisesList />} />
        <Route path="/exercises/new" element={<ExerciseForm />} />
        
        {/* Rutas de Rutinas */}
        <Route path="/routines/new" element={<CreateRoutine />} />
        <Route path="/routines" element={<Routines />} />
      </Route>

      {/* 3. Redirección si la ruta no existe */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App