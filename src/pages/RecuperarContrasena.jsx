import React, { useState } from 'react';
import '../assets/css/recuperarContrasena.css';

function RecuperarContrasena() {
  const [documento, setDocumento] = useState('');
  const [email, setEmail] = useState('');
  const [nuevaContrasena, setNuevaContrasena] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:4000/api/auth/recuperar', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ documento, email, nuevaContrasena })
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="recuperar-wrapper">
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
        <button type="submit">Actualizar contraseña</button>
      </form>
    </div>
  );
}

export default RecuperarContrasena;
