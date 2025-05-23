import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import '../assets/css/registroAfiliado.css';

function RegistroAfiliado() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [nombre, setNombre] = useState('');
  const [tipoDocumento, setTipoDocumento] = useState('CC');
  const [documento, setDocumento] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [contrasena, setContrasena] = useState('');
  const navigate = useNavigate();

  const handleRegistro = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:4000/api/auth/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre,
          tipo_documento: tipoDocumento,
          documento,
          email,
          telefono,
          direccion,
          contrasena,
          rol: 'paciente'
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || 'Error al registrar');
        return;
      }

      alert('Registro exitoso. Ahora puede iniciar sesión.');
      navigate('/login-afiliado');
    } catch (error) {
      console.error('Error al registrar:', error);
      alert('Ocurrió un error al registrar');
    }
  };

  return (
    <Layout menuOpen={menuOpen} setMenuOpen={setMenuOpen}>
      <div className="registro-form-wrapper">
        <div className='mainForm'>
          <div className='cabForm'>
            <h2>Registro de afiliado</h2>
            <p>Si ya está afiliado y quiere acceder a nuestros servicios virtuales, por favor diligencie este formulario</p>
          </div>
          <form className="registro-form" onSubmit={handleRegistro}>

            <label htmlFor="nombre">Nombre del afiliado</label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ingrese su nombre completo"
              required
            />

            <div className='rowPrin'>
              <div className='colInter'>
                <label htmlFor="tipoDocumento">Tipo de documento</label>
                <select
                  id="tipoDocumento"
                  value={tipoDocumento}
                  onChange={(e) => setTipoDocumento(e.target.value)}
                >
                  <option value="CC">Cédula</option>
                  <option value="TI">Tarjeta de Identidad</option>
                  <option value="CE">Cédula de Extranjería</option>
                  <option value="Pasaporte">Pasaporte</option>
                </select>
              </div>

              <div className='colInter'>
                <label htmlFor="documento">Número de documento</label>
                <input
                  type="text"
                  id="documento"
                  value={documento}
                  onChange={(e) => setDocumento(e.target.value)}
                  placeholder="Ingrese su número de documento"
                  required
                />
              </div>
            </div>

            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ej: correo@ejemplo.com"
              required
            />

            <div className='rowPrin'>
              <div className='colInter'>
                <label htmlFor="telefono">Teléfono</label>
                <input
                  type="tel"
                  id="telefono"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  placeholder="Ej: 3101234567"
                  required
                />
              </div>

              <div className='colInter'>
                <label htmlFor="direccion">Dirección</label>
                <input
                  type="text"
                  id="direccion"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  placeholder="Ej: Calle 123 #45-67"
                  required
                />
              </div>
            </div>

            <label htmlFor="contrasena">Contraseña</label>
            <input
              type="password"
              id="contrasena"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              required
            />

            <button type="submit">Crear cuenta</button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default RegistroAfiliado;
