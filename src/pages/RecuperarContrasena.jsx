import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/recuperarContrasena.css';
import doctorBanner from '../assets/images/HomeBannerNew.jpg';

function RecuperarContrasena() {
  const [documento, setDocumento] = useState('');
  const [email, setEmail] = useState('');
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:4000/api/auth/recuperar', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documento, email, nuevaContrasena })
      });
      const data = await res.json();
      alert(data.message);
    } catch (err) {
      console.error('Error actualizando contraseña:', err);
      alert('Hubo un error al actualizar la contraseña.');
    }
  };

  return (
    <div className="recuperar-layout">
      <div className="recuperar-img">
        <img src={doctorBanner} alt="doctor" />
      </div>

      <div className="recuperar-form">
        <div className="form-content">
          <h2>Recuperar Contraseña</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Documento"
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
          <button className="btn btn-outline" onClick={() => navigate('/login-afiliado')}>
            Volver al login
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecuperarContrasena;
