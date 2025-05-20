import { useState } from 'react'
import '../assets/css/global.css'
import '../assets/css/home.css'
import Layout from '../components/Layout'
import familyImg from '../assets/images/HomeAfiliados.jpg'
import doctorsImg from '../assets/images/HomeMedicos.jpg'

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <Layout menuOpen={menuOpen} setMenuOpen={setMenuOpen}>
      <div className="main__cards">
        <div className="card">
          <img src={familyImg} alt="Familia feliz" />
          <h2>Gestionar citas médicas</h2>
          <p>Aquí podrá agendar, consultar y cancelar sus citas médicas.</p>
          <button className="btn-primary">Acceder como afiliado</button>
        </div>

        <div className="card">
          <img src={doctorsImg} alt="Equipo médico" />
          <h2>Profesionales de la salud</h2>
          <p>Espacio para nuestro equipo de profesionales.</p>
          <button className="btn-primary">Acceder</button>
        </div>
      </div>
    </Layout>
  )
}

export default HomePage