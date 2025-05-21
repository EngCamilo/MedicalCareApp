import pool from '../config/db.js'

// Obtener todos los usuarios
export const getAllUsuarios = async () => {
  return pool.query('SELECT * FROM usuarios ORDER BY id DESC')
}

// Obtener usuario por ID
export const getUsuarioById = async (id) => {
  return pool.query('SELECT * FROM usuarios WHERE id = $1', [id])
}

// Crear nuevo usuario
export const createUsuario = async (usuario) => {
  const {
    nombre, tipo_documento, documento, email, contrasena_hash, telefono, telefono_2,
    fecha_nacimiento, edad, direccion, rol
  } = usuario

  return pool.query(
    `INSERT INTO usuarios 
    (nombre, tipo_documento, documento, email, contrasena_hash, telefono, telefono_2, 
     fecha_nacimiento, edad, direccion, rol) 
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,
    [nombre, tipo_documento, documento, email, contrasena_hash, telefono, telefono_2,
     fecha_nacimiento, edad, direccion, rol]
  )
}

// Actualizar usuario
export const updateUsuario = async (id, usuario) => {
  const {
    nombre, tipo_documento, documento, email, telefono, telefono_2,
    fecha_nacimiento, edad, direccion, rol
  } = usuario

  return pool.query(
    `UPDATE usuarios SET 
      nombre=$1, tipo_documento=$2, documento=$3, email=$4, 
      telefono=$5, telefono_2=$6, fecha_nacimiento=$7, edad=$8, 
      direccion=$9, rol=$10
    WHERE id=$11 RETURNING *`,
    [nombre, tipo_documento, documento, email, telefono, telefono_2,
     fecha_nacimiento, edad, direccion, rol, id]
  )
}

// Eliminar usuario
export const deleteUsuario = async (id) => {
  return pool.query('DELETE FROM usuarios WHERE id = $1', [id])
}