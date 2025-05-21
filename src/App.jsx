import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/home.jsx'
import LoginAfiliado from './pages/loginAfiliado'
import LoginProfesional from './pages/loginProfesional'
import RegistroAfiliado from './pages/registroAfiliado'
import DashboardAfiliado from './pages/dashboardAfiliado'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login-afiliado" element={<LoginAfiliado />} />
      <Route path="/login-profesional" element={<LoginProfesional />} />
      <Route path="/registro" element={<RegistroAfiliado />} />
      <Route path="/dashboard-afiliado" element={<DashboardAfiliado />} />
    </Routes>
  )
}

export default App
