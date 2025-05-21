import pool from '../config/db.js'

export const buscarUsuarioPorDocumento = (documento) =>
  pool.query('SELECT * FROM usuarios WHERE documento = $1', [documento])

export const crearUsuarioPaciente = ({
  nombre, tipo_documento, documento, email, hash, telefono, direccion
}) =>
  pool.query(
    `INSERT INTO usuarios (nombre, tipo_documento, documento, email, contrasena_hash, telefono, direccion, rol)
     VALUES ($1, $2, $3, $4, $5, $6, $7, 'paciente')
     RETURNING id, nombre, rol`,
    [nombre, tipo_documento, documento, email, hash, telefono, direccion]
  )


export const crearMedico = ({
  nombre,
  tipo_documento,
  documento,
  email,
  hash,
  telefono,
  direccion,
  especialidad_id,
  registro_profesional
}) => {
  return pool.query(
    `
    WITH nuevo_usuario AS (
      INSERT INTO usuarios 
        (nombre, tipo_documento, documento, email, contrasena_hash, telefono, direccion, rol)
      VALUES ($1, $2, $3, $4, $5, $6, $7, 'medico')
      RETURNING id
    )
    INSERT INTO medicos (usuario_id, especialidad_id, registro_profesional, horario_disponibilidad)
    VALUES (
      (SELECT id FROM nuevo_usuario),
      $8,
      $9,
      '{}'::jsonb
    )
    RETURNING *;
    `,
    [nombre, tipo_documento, documento, email, hash, telefono, direccion, especialidad_id, registro_profesional]
  );
};
