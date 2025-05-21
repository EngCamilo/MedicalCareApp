import { Router } from 'express'
import { login, registrarAfiliado } from '../controllers/auth.controller.js'

const router = Router()

router.post('/login', login)
router.post('/registro', registrarAfiliado)

export default router
