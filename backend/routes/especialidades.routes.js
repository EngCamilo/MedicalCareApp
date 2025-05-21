import express from 'express';
import pool from '../config/db.js'; // ajusta si tienes otra ruta

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM especialidades');
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener especialidades:', err);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

export default router;
