import bcrypt from 'bcryptjs';
import db from '../config/db.js'; // Asegúrate de tener el pool de PostgreSQL configurado aquí
import { crearMedico } from '../models/usuarios.model.js';

// Registrar médico
export const registrarMedico = async (req, res) => {
  try {
    const {
      nombre,
      tipo_documento,
      documento,
      email,
      telefono,
      direccion,
      contrasena,
      especialidad_id,
      registro_profesional
    } = req.body;

    if (req.user.rol !== 'admin') {
      return res.status(403).json({ message: 'Solo el admin puede registrar médicos.' });
    }

    const hash = await bcrypt.hash(contrasena, 10);

    const result = await crearMedico({
      nombre,
      tipo_documento,
      documento,
      email,
      hash,
      telefono,
      direccion,
      especialidad_id,
      registro_profesional
    });

    res.status(201).json({ message: 'Médico registrado correctamente', data: result.rows[0] });
  } catch (err) {
    console.error('Error al registrar médico:', err);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// Listar médicos
export const listarMedicos = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT u.id, u.nombre, u.email, m.registro_profesional, e.nombre AS especialidad
      FROM usuarios u
      JOIN medicos m ON u.id = m.usuario_id
      JOIN especialidades e ON m.especialidad_id = e.id
      WHERE u.rol = 'medico'
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener médicos:', err);
    res.status(500).json({ message: 'Error al obtener médicos' });
  }
};

// Eliminar médico
export const eliminarMedico = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.rol !== 'admin') {
      return res.status(403).json({ message: 'No autorizado' });
    }

    await db.query('DELETE FROM usuarios WHERE id = $1 AND rol = $2', [id, 'medico']);
    res.json({ message: 'Médico eliminado correctamente' });
  } catch (err) {
    console.error('Error al eliminar médico:', err);
    res.status(500).json({ message: 'Error al eliminar médico' });
  }
};
