import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout' // Importamos el Layout

import Landing from './pages/Landing'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Clients from './pages/Clients'

function App() {
  return (
    // Quitamos el div wrapper global para que cada página controle su fondo
    <Routes>
      {/* 1. Rutas Públicas (Sin Sidebar) */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />

      {/* 2. Rutas Privadas (Con Sidebar) */}
      {/* ESTA ES LA CLAVE: Todo lo que esté aquí dentro tendrá Sidebar */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/clients" element={<Clients />} />
      </Route>

      {/* 3. Redirección si la ruta no existe */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App