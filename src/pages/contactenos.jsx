import { useState } from 'react'
import '../assets/css/contactenos.css'
import '../assets/css/global.css'
import Layout from '../components/Layout'

function Contactenos() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [formulario, setFormulario] = useState({ nombre: '', email: '', mensaje: '' })
  const [enviado, setEnviado] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormulario(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Simula envío seguro con validaciones básicas (sin backend real aquí)
      if (!formulario.nombre || !formulario.email || !formulario.mensaje) return alert('Completa todos los campos')
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formulario.email)) return alert('Correo inválido')

      // Simulamos espera de red
      await new Promise(resolve => setTimeout(resolve, 1000))

      setEnviado(true)
      setFormulario({ nombre: '', email: '', mensaje: '' })
    } catch (err) {
      alert('Error al enviar mensaje')
    }
  }

  return (
    <Layout menuOpen={menuOpen} setMenuOpen={setMenuOpen}>
        <div className="contacto">
        <section className="info-contacto">
            <h1>Información de contacto</h1>
            <p>¿Tienes dudas o necesitas ayuda?<br/>Escríbenos o visita nuestras sedes:</p>
            <ul>
            <li><strong>Dirección:</strong> Calle 119 # 22 - 18, Bogotá</li>
            <li><strong>Teléfono:</strong> (601) 1345678</li>
            <li><strong>Email:</strong> contacto@medicalcare.com</li>
            </ul>
        </section>

        <section className="formulario-contacto">
            <h2>Envienos su mensaje</h2>
            <form onSubmit={handleSubmit} noValidate>
            <input
                type="text"
                name="nombre"
                placeholder="Registre su nombre"
                value={formulario.nombre}
                onChange={handleChange}
                required
            />
            <input
                type="email"
                name="email"
                placeholder="Registre su correo electrónico"
                value={formulario.email}
                onChange={handleChange}
                required
            />
            <textarea
                name="mensaje"
                placeholder="Por favor redacte su mensaje"
                rows="5"
                value={formulario.mensaje}
                onChange={handleChange}
                required
            ></textarea>
            <button type="submit" className="btn-enviar">Enviar</button>
            {enviado && <p className="mensaje-confirmacion">¡Gracias! Tu mensaje ha sido enviado.</p>}
            </form>
        </section>
        </div>
    </Layout>
  )
}

export default Contactenos