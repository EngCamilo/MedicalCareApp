import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import '../assets/css/loginAfiliado.css';
import '../assets/css/global.css';

function LoginAfiliado() {
  const [documento, setDocumento] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [recordarme, setRecordarme] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documento, contrasena }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || 'Error al iniciar sesión');
        return;
      }

      // Validar el rol correcto (paciente)
      if (!data.usuario || data.usuario.rol !== 'paciente') {
        alert('Esta sección es solo para afiliados (pacientes).');
        return;
      }

      // Guardar token y redirigir
      localStorage.setItem('token', data.token);
      localStorage.setItem('rol', data.usuario.rol);
      navigate('/dashboard-afiliado');
    } catch (error) {
      console.error('Error de login:', error);
      alert('Ocurrió un error al iniciar sesión');
    }
  };

  return (
    <Layout>
      <div className="login-form-wrapper"> 
        <form className="login-form" onSubmit={handleLogin}>
          <h2>¡Bienvenido!</h2>

          <label htmlFor="documento">Número de documento</label>
          <input
            type="text"
            id="documento"
            value={documento}
            onChange={(e) => setDocumento(e.target.value)}
            placeholder="Ingrese su documento"
            required
          />

          <label htmlFor="contrasena">Contraseña</label>
          <input
            type="password"
            id="contrasena"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            placeholder="Ingrese su contraseña"
            required
          />

          <div className="options">
            <label>
              <input
                type="checkbox"
                checked={recordarme}
                onChange={(e) => setRecordarme(e.target.checked)}
              />
              Recordarme
            </label>
            <Link to="/recuperan-contrasena">¿Olvidó su contraseña?</Link>

          </div>

          <button type="submit">Iniciar sesión</button>
        </form>
      </div>
    </Layout>
  );
}

export default LoginAfiliado;
