import { useState } from 'react'
import '../assets/css/global.css'
import '../assets/css/home.css'

import logo from '../assets/images/logo1.svg'
import menuIcon from '../assets/images/LogoWhite_.svg'
import familyImg from '../assets/images/HomeAfiliados.jpg'
import doctorsImg from '../assets/images/HomeMedicos.jpg'
import doctorSideImg from '../assets/images/HomeBannerLarge.jpg'

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="homepage">
      <header className="header">
        <div className="header__logo">
          <img src={logo} alt="Medical Care Logo" />
        </div>
        <nav className={`nav ${menuOpen ? 'nav--open' : ''}`}>
          <a href="#">Inicio</a>
          <a href="#">Nosotros</a>
          <div className="dropdown">
            <button className="dropdown-toggle">Servicios ▾</button>
            <div className="dropdown-menu">
              <a href="#">Citas médicas</a>
              <a href="#">Órdenes médicas</a>
              <a href="#">Resultados médicos</a>
            </div>
          </div>
          <a href="#">Afiliaciones</a>
          <a href="#">Contáctanos</a>
        </nav>
        <div className="header__auth">
          <div className="dropdown">
            <button className="dropdown-toggle">Iniciar sesión ▾</button>
            <div className="dropdown-menu">
              <a href="#">Afiliado</a>
              <a href="#">Profesional</a>
            </div>
          </div>
          <a href="#">Registrarse</a>
        </div>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
          <img src={menuIcon} alt="Menú" />
        </button>
      </header>

      <main className="main">
        <div className="main__left">
          <img src={doctorSideImg} alt="Médico con estetoscopio" />
        </div>

        <div className="main__cards">
          <div className="card">
            <img src={familyImg} alt="Afiliados" />
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
      </main>

      <footer className="footer">
        <div className="footer__left">
          <img src={logo} alt="Medical Care Logo" />
          <ul>
            <li><a href="#">Preguntas frecuentes</a></li>
            <li><a href="#">Navegación de servicios</a></li>
            <li><a href="#">Únete a nosotros</a></li>
            <li><a href="#">PQR</a></li>
            <li><a href="#">Política de privacidad y tratamiento de datos personales</a></li>
          </ul>
        </div>
        <div className="footer__right">
          <p><strong>WhatsApp:</strong> 310 134567</p>
          <p><strong>Línea de atención:</strong> 601 134567</p>
          <p><strong>Dirección:</strong> Cl 119 #22 - 18, Bogotá, Colombia</p>
          <div className="social">
            <a href="#"><i className="icon-whatsapp"></i></a>
            <a href="#"><i className="icon-facebook"></i></a>
            <a href="#"><i className="icon-twitter"></i></a>
            <a href="#"><i className="icon-email"></i></a>
          </div>
        </div>
        <div className="footer__bottom">
          <p>Copyright © | Todos los derechos reservados <strong>Medical Care</strong></p>
        </div>
      </footer>
    </div>
  )
  console.log('Renderizando HomePage')
}

export default HomePage