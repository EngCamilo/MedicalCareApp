import {
  getAllHistorias,
  getHistoriaById,
  createHistoria,
  updateHistoria,
  deleteHistoria
} from '../models/historias.model.js'

export const obtenerHistorias = async (req, res) => {
  try {
    const result = await getAllHistorias()
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const obtenerHistoria = async (req, res) => {
  try {
    const { id } = req.params
    const result = await getHistoriaById(id)
    if (result.rows.length === 0) return res.status(404).json({ error: 'Historia no encontrada' })
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const crearHistoria = async (req, res) => {
  try {
    const result = await createHistoria(req.body)
    res.status(201).json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const actualizarHistoria = async (req, res) => {
  try {
    const { id } = req.params
    const result = await updateHistoria(id, req.body)
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const eliminarHistoria = async (req, res) => {
  try {
    const { id } = req.params
    await deleteHistoria(id)
    res.json({ mensaje: 'Historia eliminada' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}