import { useState } from 'react'
import '../assets/css/dashboardAfiliado.css'
import '../assets/css/global.css'
import Layout from '../components/LayoutDashboard'
import citasIcon from '../assets/images/iconCalendar.png'
import ordenesIcon from '../assets/images/iconOrden.png'
import resultadosIcon from '../assets/images/iconResult.png'
import { Link } from 'react-router-dom'
import { FaHome, FaSyncAlt, FaSearch, FaList, FaUser, FaHeadset, FaBars } from 'react-icons/fa'

function DashboardAfiliado() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <Layout menuOpen={menuOpen} setMenuOpen={setMenuOpen}>
        <div className="dashboard__cards">
          <div className="dashboard__card">
            <img src={citasIcon} alt="Citas médicas" />
            <h3>CITAS MÉDICAS</h3>
          </div>

          <div className="dashboard__card">
            <img src={ordenesIcon} alt="Órdenes médicas" />
            <h3>ORDENES MÉDICAS</h3>
          </div>

          <div className="dashboard__card">
            <img src={resultadosIcon} alt="Resultados médicos" />
            <h3>RESULTADOS MÉDICOS</h3>
          </div>
        </div>
    </Layout>
  )
}

export default DashboardAfiliado