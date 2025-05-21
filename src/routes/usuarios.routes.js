import express from 'express'
import {
  obtenerUsuarios,
  obtenerUsuario,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario
} from '../controllers/usuarios.controller.js'

const router = express.Router()

router.get('/', obtenerUsuarios)
router.get('/:id', obtenerUsuario)
router.post('/', crearUsuario)
router.put('/:id', actualizarUsuario)
router.delete('/:id', eliminarUsuario)

export default router