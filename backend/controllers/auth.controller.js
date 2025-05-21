import db from '../config/db.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { buscarUsuarioPorDocumento, crearUsuarioPaciente } from '../models/usuarios.model.js'

export const login = async (req, res) => {
  const { documento, contrasena } = req.body
  const result = await buscarUsuarioPorDocumento(documento)
  if (!result.rows.length) return res.status(404).json({ message: 'Usuario no encontrado' })

  const usuario = result.rows[0]
  const valid = await bcrypt.compare(contrasena, usuario.contrasena_hash)
  if (!valid) return res.status(401).json({ message: 'Contraseña incorrecta' })

  const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, process.env.JWT_SECRET, { expiresIn: '1h' })
  res.json({ token, usuario: { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol } })
}

export const registrarAfiliado = async (req, res) => {
  const { nombre, tipo_documento, documento, email, telefono, direccion, contrasena } = req.body
  const hash = await bcrypt.hash(contrasena, 10)
  const result = await crearUsuarioPaciente({ nombre, tipo_documento, documento, email, hash, telefono, direccion })
  const usuario = result.rows[0]
  const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, process.env.JWT_SECRET, { expiresIn: '1h' })

  res.status(201).json({ message: 'Registro exitoso', token, usuario })
}

export const recuperarContrasena = async (req, res) => {
  const { documento, email, nuevaContrasena } = req.body;

  try {
    const result = await db.query(
      'SELECT id FROM usuarios WHERE documento = $1 AND email = $2',
      [documento, email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No se encontró ningún usuario con esos datos.' });
    }

    const hash = await bcrypt.hash(nuevaContrasena, 10);

    await db.query(
      'UPDATE usuarios SET contrasena_hash = $1 WHERE documento = $2 AND email = $3',
      [hash, documento, email]
    );

    res.json({ message: 'Contraseña actualizada correctamente' });
  } catch (err) {
    console.error('Error al recuperar contraseña:', err);
    res.status(500).json({ message: 'Error del servidor' });
  }
};
