import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../assets/css/global.css'
import '../assets/css/home.css'
import logo from '../assets/images/logo1.svg'
import logoW from '../assets/images/LogoWhite_.svg'
import doctorSideImg from '../assets/images/HomeBannerNew.jpg'

function Layout({ children, menuOpen, setMenuOpen }) {
  return (
    <div className="homepage-grid">
      {/* Banner */}
      <div className="banner">
        <img src={doctorSideImg} alt="Médico con estetoscopio" />
      </div>

      {/* Contenido común + dinámico */}
      <div className="main-content">
        {/* Fila 1: Login y registro */}
        <div className="auth-bar">
          <div className="auth-options">
            <div className="dropdown">
              <button className="dropdown-toggle">Iniciar sesión ▾</button>
              <div className="dropdown-menu">
                <Link to="/login-afiliado">Afiliado</Link>
                <Link to="/login-profesional">Profesional</Link>
              </div>
            </div>
            <a href="#">Registrarse</a>
          </div>
        </div>

        {/* Header de navegación */}
        <header className="header">
          <div className="header__logo">
            <img src={logo} alt="Medical Care Logo" />
            <div> 
              <p className='logo_t2'>Medical Care<br/><span>IPS Sector Salud</span></p>
            </div> 
          </div>
          <nav className={`nav ${menuOpen ? 'nav--open' : ''}`}>
            <Link to="/">Inicio</Link>
            <a href="#">Nosotros</a>
            <div className="dropdown">
              <button className="dropdown-toggle">Servicios ▾</button>
              <div className="dropdown-menu">
                <a href="#">Citas médicas</a><br/>
                <a href="#">Órdenes médicas</a><br/>
                <a href="#">Resultados médicos</a>
              </div>
            </div>
            <a href="#">Afiliaciones</a>
            <a href="#">Contáctanos</a>
          </nav>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
            <a><i className="fas fa-bars"></i></a>
          </button>
        </header>

        {/* Contenido dinámico */}
        {children}
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer__main">
          <div className="footer__logo">
            <img src={logoW} alt="Medical Care Logo" />
            <div> 
              <p className='logo_t2'>Medical Care<br /><span>IPS Sector Salud</span></p>
            </div>
          </div>
          <div className="footer__links">
            <ul>
              <li><a href="#">PQR</a></li>
              <li><a href="#">Preguntas frecuentes</a></li>
              <li><a href="#">Navegación de servicios</a></li>
              <li><a href="#">Únete a nosotros</a></li>
              <li><a href="#">Política de privacidad y<br/>tratamiento de datos personales</a></li>
            </ul>
          </div>
          <div className="footer__contact">
            <p><strong>WhatsApp:</strong> 310 134567</p>
            <p><strong>Línea de atención:</strong> 601 134567</p>
            <p><strong>Dirección:</strong> Cl 119 #22 - 18</p>
            <p>Bogotá, Colombia</p>
          </div>
          <div className="footer__social">
            <a href="#"><i className="fab fa-whatsapp"></i></a>
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fas fa-envelope"></i></a>
          </div>
        </div>
        <div className="footer__bottom">
          <p>Copyright © | Todos los derechos reservados <strong>Medical Care</strong></p>
        </div>
      </footer>
    </div>
  )
}

export default Layout