import { useEffect, useState } from 'react'
import '../assets/css/citas.css'
import '../assets/css/global.css'
import Layout from '../components/LayoutDashboard'
import { Link } from 'react-router-dom'

function CitasMedicas() {
  const [citas, setCitas] = useState([])
  const [formulario, setFormulario] = useState({
    fecha_hora: '',
    medico_id: '',
    motivo: ''
  })

  const token = localStorage.getItem('token')
  const usuario_id = localStorage.getItem('usuario_id')

  const obtenerCitas = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/citas', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.message || 'Error al cargar citas')
        return
      }

      setCitas(data)
    } catch (err) {
      console.error('Error al obtener citas:', err)
    }
  }

  const agendarCita = async (e) => {
    e.preventDefault()
    try {
      const citaData = {
        paciente_id: parseInt(usuario_id),
        medico_id: parseInt(formulario.medico_id),
        fecha_hora: formulario.fecha_hora,
        estado: 'pendiente',
        motivo: formulario.motivo
      }

      const res = await fetch('http://localhost:4000/api/citas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(citaData)
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.message || 'Error al agendar cita')
        return
      }

      setFormulario({ fecha_hora: '', medico_id: '', motivo: '' })
      obtenerCitas()
    } catch (err) {
      console.error('Error al agendar cita:', err)
    }
  }

  const cancelarCita = async (id) => {
    try {
      const res = await fetch(`http://localhost:4000/api/citas/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.message || 'Error al cancelar cita')
        return
      }

      obtenerCitas()
    } catch (err) {
      console.error('Error al cancelar cita:', err)
    }
  }

  useEffect(() => {
    obtenerCitas()
  }, [])

  return (
    <Layout menuOpen={menuOpen} setMenuOpen={setMenuOpen}>
        <div className="citas">
            <h2>Mis Citas Médicas</h2>

            <form className="form-cita" onSubmit={agendarCita}>
                <input
                type="datetime-local"
                value={formulario.fecha_hora}
                onChange={e => setFormulario({ ...formulario, fecha_hora: e.target.value })}
                required
                />
                <input
                type="number"
                placeholder="ID Médico"
                value={formulario.medico_id}
                onChange={e => setFormulario({ ...formulario, medico_id: e.target.value })}
                required
                />
                <input
                type="text"
                placeholder="Motivo"
                value={formulario.motivo}
                onChange={e => setFormulario({ ...formulario, motivo: e.target.value })}
                required
                />
                <button type="submit">Agendar</button>
            </form>

            <table className="tabla-citas">
                <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Médico</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {citas.map(cita => (
                    <tr key={cita.id}>
                    <td>{new Date(cita.fecha_hora).toLocaleString()}</td>
                    <td>{cita.medico_nombre || cita.medico_id}</td>
                    <td>{cita.estado}</td>
                    <td>
                        {cita.estado === 'pendiente' && (
                        <button onClick={() => cancelarCita(cita.id)}>Cancelar</button>
                        )}
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    </Layout>

  )
}

export default CitasMedicas