import pool from '../config/db.js'

// Obtener todas las citas (con nombre del paciente y médico)
export const getAllCitas = () => {
  return pool.query(`
    SELECT c.*, 
           up.nombre AS paciente_nombre, 
           um.nombre AS medico_nombre
    FROM citas c
    JOIN usuarios up ON c.paciente_id = up.id
    JOIN usuarios um ON c.medico_id = um.id
    ORDER BY c.fecha_hora DESC
  `)
}

// Obtener una cita por ID
export const getCitaById = (id) => {
  return pool.query(`
    SELECT c.*, 
           up.nombre AS paciente_nombre, 
           um.nombre AS medico_nombre
    FROM citas c
    JOIN usuarios up ON c.paciente_id = up.id
    JOIN usuarios um ON c.medico_id = um.id
    WHERE c.id = $1
  `, [id])
}

// Crear una nueva cita
export const createCita = ({ paciente_id, medico_id, fecha_hora, estado }) => {
  return pool.query(`
    INSERT INTO citas (paciente_id, medico_id, fecha_hora, estado)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `, [paciente_id, medico_id, fecha_hora, estado])
}

// Actualizar cita
export const updateCita = (id, { paciente_id, medico_id, fecha_hora, estado }) => {
  return pool.query(`
    UPDATE citas SET
      paciente_id = $1,
      medico_id = $2,
      fecha_hora = $3,
      estado = $4
    WHERE id = $5
    RETURNING *
  `, [paciente_id, medico_id, fecha_hora, estado, id])
}

// Eliminar cita
export const deleteCita = (id) => {
  return pool.query('DELETE FROM citas WHERE id = $1', [id])
}