import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import usuarioRoutes from './routes/usuarios.routes.js'
import medicosRoutes from './routes/medicos.routes.js'
import citasRoutes from './routes/citas.routes.js'
import historiasRoutes from './routes/historias.routes.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

// Rutas
app.use('/api/usuarios', usuarioRoutes)
app.use('/api/medicos', medicosRoutes)
app.use('/api/citas', citasRoutes)
app.use('/api/historias', historiasRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})