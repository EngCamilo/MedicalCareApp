import { useState } from 'react'
import '../assets/css/ModalPasswordRec.css'

function ModalPasswordRec({ visible, onClose }) {
  const [email, setEmail] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [documento, setDocumento] = useState('');
  const [nuevaContrasena, setNuevaContrasena] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:4000/api/auth/recuperar', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documento, email, nuevaContrasena })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        alert(data.message || 'Error en recuperación')
        return
      }

      setMensaje('Instrucciones enviadas a tu correo')
      setTimeout(() => {
        onClose()
        setMensaje('')
        setEmail('')
      }, 2500)
    } catch (err) {
      console.error('Error actualizando contraseña:', err);
      alert('Hubo un error al actualizar la contraseña.');
    }
  }

  if (!visible) return null;

  return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-contenido" onClick={e => e.stopPropagation()}>
          <h2>Recuperar contraseña</h2>
            <form onSubmit={handleSubmit}>
                
                <input
                type="text"
                placeholder="Número de documento"
                value={documento}
                onChange={(e) => setDocumento(e.target.value)}
                required
                />
                <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
                <input
                type="password"
                placeholder="Nueva contraseña"
                value={nuevaContrasena}
                onChange={(e) => setNuevaContrasena(e.target.value)}
                required
                />
                <button type="submit" className="btn btn-primary">Actualizar contraseña</button>
            </form>
          {mensaje && <p className="mensaje-exito">{mensaje}</p>}
          <button className="cerrar" onClick={onClose}>✖</button>
        </div>
      </div>
  );
}

export default ModalPasswordRec;