import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/registroMedico.css';

function RegistroMedico() {
  const [form, setForm] = useState({
    nombre: '',
    tipo_documento: 'CC',
    documento: '',
    email: '',
    telefono: '',
    direccion: '',
    contrasena: '',
    especialidad_id: '',
    registro_profesional: ''
  });

  const [especialidades, setEspecialidades] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const rol = localStorage.getItem('rol');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    navigate('/login-profesional');
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:4000/api/admin/crear-medico', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      alert(data.message);

      if (res.ok) {
        setForm({
          nombre: '',
          tipo_documento: 'CC',
          documento: '',
          email: '',
          telefono: '',
          direccion: '',
          contrasena: '',
          especialidad_id: '',
          registro_profesional: ''
        });
        fetchMedicos();
      }
    } catch (err) {
      console.error('Error al registrar médico:', err);
    }
  };

  const fetchEspecialidades = async () => {
    const res = await fetch('http://localhost:4000/api/especialidades');
    const data = await res.json();
    setEspecialidades(data);
  };

  const fetchMedicos = async () => {
    const res = await fetch('http://localhost:4000/api/admin/medicos', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data = await res.json();
    setMedicos(data);
  };

  const eliminarMedico = async (id) => {
    const confirm = window.confirm('¿Estás seguro de eliminar este médico?');
    if (!confirm) return;

    const res = await fetch(`http://localhost:4000/api/admin/medicos/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();
    alert(data.message);
    fetchMedicos();
  };

  useEffect(() => {
    fetchEspecialidades();
    fetchMedicos();
  }, []);

  return (
    <>
      {rol === 'admin' && (
        <div className="logout-container">
          <button className="btn-cerrar-sesion" onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      )}

      <div className="registro-admin-container">
        <form className="registro-form" onSubmit={handleSubmit}>
          <h2>Registro de Médico</h2>

          {['nombre', 'documento', 'email', 'telefono', 'direccion', 'contrasena', 'registro_profesional'].map(field => (
            <input
              key={field}
              name={field}
              value={form[field]}
              onChange={handleChange}
              placeholder={field.replace('_', ' ')}
              required
            />
          ))}

          <select name="tipo_documento" value={form.tipo_documento} onChange={handleChange}>
            <option value="CC">Cédula</option>
            <option value="TI">Tarjeta de Identidad</option>
            <option value="CE">Cédula de Extranjería</option>
            <option value="Pasaporte">Pasaporte</option>
          </select>

          <select name="especialidad_id" value={form.especialidad_id} onChange={handleChange} required>
            <option value="">Seleccionar especialidad</option>
            {especialidades.map((esp) => (
              <option key={esp.id} value={esp.id}>{esp.nombre}</option>
            ))}
          </select>

          <button type="submit">Registrar Médico</button>
        </form>
      </div>

      <div className="tabla-medicos">
        <h2>Médicos Registrados</h2>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Especialidad</th>
              <th>Registro</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {medicos.map((m) => (
              <tr key={m.id}>
                <td>{m.nombre}</td>
                <td>{m.email}</td>
                <td>{m.especialidad}</td>
                <td>{m.registro_profesional}</td>
                <td>
                  <button className="btn-eliminar" onClick={() => eliminarMedico(m.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default RegistroMedico;
