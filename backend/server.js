import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import authRoutes from './routes/auth.routes.js'
import especialidadesRoutes from './routes/especialidades.routes.js';
import adminRoutes from './routes/admin.routes.js';

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/especialidades', especialidadesRoutes);

app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes); 


const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`))






