import express from 'express'
import {
  obtenerHistorias,
  obtenerHistoria,
  crearHistoria,
  actualizarHistoria,
  eliminarHistoria
} from '../controllers/historias.controller.js'

const router = express.Router()

router.get('/', obtenerHistorias)
router.get('/:id', obtenerHistoria)
router.post('/', crearHistoria)
router.put('/:id', actualizarHistoria)
router.delete('/:id', eliminarHistoria)

export default router