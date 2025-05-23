import { useState } from 'react'
import '../assets/css/global.css'
import '../assets/css/nosotros.css'
import Layout from '../components/Layout'
import cardIcon from '../assets/images/iconOrden.png'

function Nosotros() {
  const [menuOpen, setMenuOpen] = useState(false)
  const especialidades = [
    'Medicina General',
    'Pediatría',
    'Ginecología',
    'Medicina Interna',
    'Dermatología',
    'Odontología'
  ]

  const trayectoria = [
    { anio: '2015', evento: 'Fundación del centro médico' },
    { anio: '2017', evento: 'Implementación de nuevas especialidades' },
    { anio: '2020', evento: 'Implementación de historia clínica electrónica' },
    { anio: '2023', evento: 'Certificación en calidad ISO 9001' }
  ]

  return (
    <Layout menuOpen={menuOpen} setMenuOpen={setMenuOpen}>
        <div className="nosotros">
        {/* Institucional */}
        <section className="institucional">
            
            <p className="mision">
            En <span className='resalt'>Medical Care</span> nos dedicamos a brindar servicios de salud integrales y humanizados,
            comprometidos con la calidad y el bienestar de nuestros pacientes.
            </p>
            <p className="vision">
            Nuestra visión es ser un referente en atención médica confiable, oportuna y accesible.
            </p>
        </section>

        <div className='sections'>  
        {/* Línea de tiempo */}
            <section className="trayectoria">   
                <h2>Nuestra Trayectoria</h2>
                <div className="timeline">
                {trayectoria.map((item, idx) => (
                    <div key={idx} className="timeline-item">
                    <div className="timeline-year">{item.anio}</div>
                    <div className="timeline-event">{item.evento}</div>
                    </div>
                ))}
                </div>
            </section>

            {/* Especialidades */}
            <section className="especialidades">
                <h2>Especialidades Médicas</h2>
                <div className="especialidades-grid">
                {especialidades.map((esp, idx) => (
                    <div key={idx} className="especialidad-card">
                    <h3>{esp}</h3>
                    </div>
                ))}
                </div>
            </section>
        </div>
        </div>
    </Layout>
  )
}

export default Nosotros