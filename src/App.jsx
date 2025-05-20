import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/home.jsx'
import LoginAfiliado from './pages/loginAfiliado'
import LoginProfesional from './pages/loginProfesional'
import RegistroAfiliado from './pages/registroAfiliado'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login-afiliado" element={<LoginAfiliado />} />
      <Route path="/login-profesional" element={<LoginProfesional />} />
      <Route path="/registro" element={<RegistroAfiliado />} />
    </Routes>
  )
}

export default App
