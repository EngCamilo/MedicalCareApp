import {
  getAllMedicos,
  getMedicoById,
  createMedico,
  updateMedico,
  deleteMedico
} from '../models/medicos.model.js'

export const obtenerMedicos = async (req, res) => {
  try {
    const result = await getAllMedicos()
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const obtenerMedico = async (req, res) => {
  try {
    const { id } = req.params
    const result = await getMedicoById(id)
    if (result.rows.length === 0) return res.status(404).json({ error: 'Médico no encontrado' })
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const crearMedico = async (req, res) => {
  try {
    const result = await createMedico(req.body)
    res.status(201).json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const actualizarMedico = async (req, res) => {
  try {
    const { id } = req.params
    const result = await updateMedico(id, req.body)
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const eliminarMedico = async (req, res) => {
  try {
    const { id } = req.params
    await deleteMedico(id)
    res.json({ mensaje: 'Médico eliminado' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}