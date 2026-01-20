import { Routes, Route, Navigate } from 'react-router-dom'
// import Sidebar from './components/layout/Sidebar' 
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
import ClientRoutineDetail from './pages/ClientRoutineDetail';
// import { Outlet } from 'react-router-dom' <--- YA NO ES NECESARIO (lo usa MainLayout)

// IMPORTAMOS TU LAYOUT EXTERNO (El que tiene el botón hamburguesa y la lógica)
import MainLayout from './components/layout/MainLayout'; 

function App() {
  return (
    <Routes>
      {/* 1. Ruta Pública: LOGIN */}
      <Route path="/login" element={<Login />} />

      {/* 2. Rutas Protegidas */}
      <Route element={<ProtectedRoute />}>
        
        {/* Usamos el MainLayout importado que maneja el menú responsive */}
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
          <Route path="/rutina" element={<ClientRoutineDetail />} />

          {/* Ejercicios */}
          <Route path="/exercises" element={<ExercisesList />} />
          <Route path="/exercises/new" element={<ExerciseForm />} />
          <Route path="/exercises/edit/:id" element={<ExerciseForm />} />
        </Route>

      </Route>

      {/* Redirección por defecto */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App