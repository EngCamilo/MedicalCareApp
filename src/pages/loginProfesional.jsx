import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import '../assets/css/login.css';
import '../assets/css/global.css';

function LoginProfesional() {
  const [menuOpen, setMenuOpen] = useState(false)
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
        alert(data.message || 'Credenciales incorrectas');
        return;
      }

      if (!data.usuario || (data.usuario.rol !== 'medico' && data.usuario.rol !== 'admin')) {
        alert('Esta sección es solo para profesionales de la salud o administradores.');
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('rol', data.usuario.rol);

      if (data.usuario.rol === 'admin') {
        navigate('/admin/registro-medico');
      } else {
        navigate('/dashboard-profesional');
      }
    } catch (error) {
      console.error('Error de login profesional:', error);
      alert('Ocurrió un error al iniciar sesión');
    }
  };

  return (
    <Layout menuOpen={menuOpen} setMenuOpen={setMenuOpen}>
      <div className="login-form-wrapper">
        <div className='mainForm'>
          <h2><span>Solo si haces parte de nuestro equipo</span><br/>¡Bienvenido!</h2>
          <form className="login-form" onSubmit={handleLogin}>
            <label htmlFor="documento">Usuario</label>
            <input
              type="text"
              id="documento"
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
              placeholder="Ingrese con su documento"
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
              <a href="#">¿Olvidó su contraseña?</a>
            </div>

            <button type="submit">Iniciar sesión</button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default LoginProfesional;
