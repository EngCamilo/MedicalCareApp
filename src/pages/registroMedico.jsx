import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';

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

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

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
  };

  useEffect(() => {
    // Obtener especialidades
    fetch('http://localhost:4000/api/especialidades')
      .then(res => res.json())
      .then(data => setEspecialidades(data));
  }, []);

  return (
    <Layout>
      <div className="registro-form-wrapper">
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
    </Layout>
  );
}

export default RegistroMedico;
