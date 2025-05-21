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
