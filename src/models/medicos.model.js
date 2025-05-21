import pool from '../config/db.js'

// Obtener todos los médicos (con nombre y especialidad)
export const getAllMedicos = () => {
  return pool.query(`
    SELECT m.*, u.nombre, e.nombre AS especialidad
    FROM medicos m
    JOIN usuarios u ON m.usuario_id = u.id
    JOIN especialidades e ON m.especialidad_id = e.id
    ORDER BY u.nombre
  `)
}

// Obtener médico por ID
export const getMedicoById = (id) => {
  return pool.query(`
    SELECT m.*, u.nombre, e.nombre AS especialidad
    FROM medicos m
    JOIN usuarios u ON m.usuario_id = u.id
    JOIN especialidades e ON m.especialidad_id = e.id
    WHERE m.usuario_id = $1
  `, [id])
}

// Crear médico
export const createMedico = ({ usuario_id, especialidad_id, registro_profesional, telefono, horario_disponibilidad }) => {
  return pool.query(`
    INSERT INTO medicos (usuario_id, especialidad_id, registro_profesional, telefono, horario_disponibilidad)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `, [usuario_id, especialidad_id, registro_profesional, telefono, horario_disponibilidad])
}

// Actualizar médico
export const updateMedico = (usuario_id, { especialidad_id, registro_profesional, telefono, horario_disponibilidad }) => {
  return pool.query(`
    UPDATE medicos SET
      especialidad_id = $1,
      registro_profesional = $2,
      telefono = $3,
      horario_disponibilidad = $4
    WHERE usuario_id = $5
    RETURNING *
  `, [especialidad_id, registro_profesional, telefono, horario_disponibilidad, usuario_id])
}

// Eliminar médico
export const deleteMedico = (usuario_id) => {
  return pool.query('DELETE FROM medicos WHERE usuario_id = $1', [usuario_id])
}