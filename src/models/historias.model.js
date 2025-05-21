import pool from '../config/db.js'

// Obtener todas las historias clínicas
export const getAllHistorias = () => {
  return pool.query(`
    SELECT hc.*, up.nombre AS paciente_nombre, um.nombre AS medico_nombre
    FROM historias_clinicas hc
    JOIN usuarios up ON hc.paciente_id = up.id
    LEFT JOIN usuarios um ON hc.medico_id = um.id
    ORDER BY hc.fecha_registro DESC
  `)
}

// Obtener historia clínica por ID
export const getHistoriaById = (id) => {
  return pool.query(`
    SELECT hc.*, up.nombre AS paciente_nombre, um.nombre AS medico_nombre
    FROM historias_clinicas hc
    JOIN usuarios up ON hc.paciente_id = up.id
    LEFT JOIN usuarios um ON hc.medico_id = um.id
    WHERE hc.id = $1
  `, [id])
}

// Crear nueva historia clínica
export const createHistoria = ({ paciente_id, medico_id, diagnostico, medicamentos, alergias, antecedentes, adjuntos }) => {
  return pool.query(`
    INSERT INTO historias_clinicas 
    (paciente_id, medico_id, diagnostico, medicamentos, alergias, antecedentes, adjuntos)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
  `, [paciente_id, medico_id, diagnostico, medicamentos, alergias, antecedentes, adjuntos])
}

// Actualizar historia
export const updateHistoria = (id, { diagnostico, medicamentos, alergias, antecedentes, adjuntos }) => {
  return pool.query(`
    UPDATE historias_clinicas SET
      diagnostico = $1,
      medicamentos = $2,
      alergias = $3,
      antecedentes = $4,
      adjuntos = $5
    WHERE id = $6
    RETURNING *
  `, [diagnostico, medicamentos, alergias, antecedentes, adjuntos, id])
}

// Eliminar historia
export const deleteHistoria = (id) => {
  return pool.query('DELETE FROM historias_clinicas WHERE id = $1', [id])
}