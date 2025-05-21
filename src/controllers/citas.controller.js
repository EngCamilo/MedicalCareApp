import {
  getAllCitas,
  getCitaById,
  createCita,
  updateCita,
  deleteCita
} from '../models/citas.model.js'

export const obtenerCitas = async (req, res) => {
  try {
    const result = await getAllCitas()
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const obtenerCita = async (req, res) => {
  try {
    const { id } = req.params
    const result = await getCitaById(id)
    if (result.rows.length === 0) return res.status(404).json({ error: 'Cita no encontrada' })
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const crearCita = async (req, res) => {
  try {
    const result = await createCita(req.body)
    res.status(201).json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const actualizarCita = async (req, res) => {
  try {
    const { id } = req.params
    const result = await updateCita(id, req.body)
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const eliminarCita = async (req, res) => {
  try {
    const { id } = req.params
    await deleteCita(id)
    res.json({ mensaje: 'Cita eliminada' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}