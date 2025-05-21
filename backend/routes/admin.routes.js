import { Router } from 'express';
import { registrarMedico, listarMedicos, eliminarMedico } from '../controllers/admin.controller.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = Router();

router.post('/crear-medico', verifyToken, registrarMedico);
router.get('/medicos', verifyToken, listarMedicos);
router.delete('/medicos/:id', verifyToken, eliminarMedico);

export default router;
