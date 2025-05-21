import express from 'express'
import {
  obtenerMedicos,
  obtenerMedico,
  crearMedico,
  actualizarMedico,
  eliminarMedico
} from '../controllers/medicos.controller.js'

const router = express.Router()

router.get('/', obtenerMedicos)
router.get('/:id', obtenerMedico)
router.post('/', crearMedico)
router.put('/:id', actualizarMedico)
router.delete('/:id', eliminarMedico)

export default router