import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/layout/Sidebar'
import Dashboard from './pages/Dashboard'
import Clients from './pages/Clients'
import ClientForm from './pages/ClientForm'
import Routines from './pages/Routines'
import CreateRoutine from './pages/CreateRoutine'
import RoutineDetail from './pages/RoutineDetail'
import ExercisesList from './pages/ExercisesList'
import ExerciseForm from './pages/ExerciseForm'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute' 
import { Outlet } from 'react-router-dom'

// Layout principal para las páginas protegidas (Con Sidebar)
const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#000000]">
      <Sidebar />
      <div className="flex-1 ml-0 md:ml-64 p-8 overflow-y-auto h-screen">
        <Outlet />
      </div>
    </div>
  )
}

function App() {
  return (
    <Routes>
      {/* 1. Ruta Pública: LOGIN (Sin Sidebar, pantalla completa) */}
      <Route path="/login" element={<Login />} />

      {/* 2. Rutas Protegidas (Solo accesibles con Token) */}
      <Route element={<ProtectedRoute />}>
        
        {/* Usamos el MainLayout para agregar la Sidebar a todas estas rutas */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          
          {/* Clientes */}
          <Route path="/clients" element={<Clients />} />
          <Route path="/clients/new" element={<ClientForm />} />
          <Route path="/clients/edit/:id" element={<ClientForm />} />

          {/* Rutinas */}
          <Route path="/routines" element={<Routines />} />
          <Route path="/routines/new" element={<CreateRoutine />} />
          <Route path="/routines/edit/:id" element={<CreateRoutine />} />
          <Route path="/routines/:id" element={<RoutineDetail />} />

          {/* Ejercicios */}
          <Route path="/exercises" element={<ExercisesList />} />
          <Route path="/exercises/new" element={<ExerciseForm />} />
          <Route path="/exercises/edit/:id" element={<ExerciseForm />} />
        </Route>

      </Route>

      {/* Redirección por defecto: Si ponen una ruta loca, mandar al Login o al Dashboard */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App