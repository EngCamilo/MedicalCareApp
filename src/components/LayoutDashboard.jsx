import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../assets/css/global.css'
import '../assets/css/dashboardAfiliado.css'
import logo from '../assets/images/logo1.svg'
import logoW from '../assets/images/LogoWhite_.svg'
import { FaHome, FaSyncAlt, FaSearch, FaList, FaUser, FaHeadset, FaBars } from 'react-icons/fa'

function LayoutDashboard({ children, menuOpen, setMenuOpen }) {
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="sidebar__logo">
          <img src={logo} alt="Medical Care Logo" />
          <div> 
            <p className='logo_t2'>Medical Care<br/><span>IPS Sector Salud</span></p>
          </div>
        </div>
        <nav className="sidebar__nav">
          <Link to="#" className="nav-item active">
            <FaHome /> Inicio
          </Link>
          <Link to="#" className="nav-item">
            <FaSyncAlt /> Actualización de datos
          </Link>
          <Link to="#" className="nav-item">
            <FaSearch /> Consultas y solicitudes
          </Link>
          <Link to="#" className="nav-item">
            <FaList /> Servicios
          </Link>
          <Link to="#" className="nav-item">
            <FaUser /> Historia clínica
          </Link>
          <Link to="#" className="nav-item">
            <FaHeadset /> Soporte
          </Link>
        </nav>
      </div>

      {/* Contenido principal */}
      <div className="dashboard__main">
        <header className="dashboard__header">
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            <FaBars />
          </button>
          <span className="welcome">Bienvenido(a) <strong>Nombre Usuario</strong></span>
          <button className="logout">⎋ Cerrar sesión</button>
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

export default LayoutDashboard