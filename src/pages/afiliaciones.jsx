import { useState } from 'react'
import '../assets/css/afiliaciones.css'
import Layout from '../components/Layout'


function Afiliaciones() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pasos = [
    {
      titulo: '1. Solicita la afiliación',
      descripcion: 'Acércate a cualquiera de nuestras sedes o completa el formulario de solicitud en línea con tus datos personales y documentos requeridos.'
    },
    {
      titulo: '2. Validación de información',
      descripcion: 'Nuestro equipo revisará tu solicitud y verificará tu información para garantizar el cumplimiento de requisitos.'
    },
    {
      titulo: '3. Confirmación de afiliación',
      descripcion: 'Recibirás una notificación por correo o SMS cuando tu afiliación haya sido aprobada exitosamente.'
    },
    {
      titulo: '4. Registro en la plataforma',
      descripcion: 'Una vez afiliado, podrás registrarte como usuario en nuestra plataforma virtual para acceder a todos los servicios digitales.'
    }
  ]

  return (
    <Layout menuOpen={menuOpen} setMenuOpen={setMenuOpen}>
        <div className="afiliaciones">
            <section className="intro">
                <h1>Afíliate a Medical Care</h1>
                <p>
                Accede a servicios de salud con calidad y tecnología. El proceso de afiliación es fácil y te permite acceder a nuestros servicios virtuales de forma segura.
                </p>
            </section>

            <section className="pasos">
                <h2>¿Cómo afiliarte?</h2>
                <div className="pasos-grid">
                {pasos.map((paso, idx) => (
                    <div key={idx} className="paso-card">
                    <h3>{paso.titulo}</h3>
                    <p>{paso.descripcion}</p>
                    </div>
                ))}
                </div>
            </section>
        </div>
    </Layout>
  )
}

export default Afiliaciones