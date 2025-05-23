import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/home.jsx'
import LoginAfiliado from './pages/loginAfiliado'
import LoginProfesional from './pages/loginProfesional'
import RegistroAfiliado from './pages/registroAfiliado'
import DashboardAfiliado from './pages/dashboardAfiliado'
import RegistroMedico from './pages/registroMedico'
import CitasMedicas from './pages/citas'
import Nosotros from './pages/nosotros'
import Afiliaciones from './pages/afiliaciones'
import Contactenos from './pages/contactenos'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login-afiliado" element={<LoginAfiliado />} />
      <Route path="/login-profesional" element={<LoginProfesional />} />
      <Route path="/registro" element={<RegistroAfiliado />} />
      <Route path="/dashboard-afiliado" element={<DashboardAfiliado />} />
      <Route path="/admin/registro-medico" element={<RegistroMedico />} />
      <Route path="/citas-medicas" element={<CitasMedicas />} />
      <Route path="/nosotros" element={<Nosotros />} />
      <Route path="/afiliaciones" element={<Afiliaciones />} />
      <Route path="/contactenos" element={<Contactenos />} />
    </Routes>
  )
}

export default App