# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# 🏥 MedicalCareApp / Proyecto Académico

Aplicación web desarrollada para la gestión integral de un centro médico. Incluye funcionalidades para afiliados, médicos y personal administrativo con acceso a servicios virtuales como gestión de citas, historia clínica electrónica, órdenes médicas y más.

---

## 🚀 Tecnologías utilizadas

### Frontend
- React 18+ con Vite
- Zustand (estado global)
- Radix UI (modales)
- CSS tradicional y responsive
- React Router DOM

### Backend
- Node.js con Express
- PostgreSQL
- JWT para autenticación
- Helmet, CORS, dotenv

### DevOps / Herramientas
- VS Code
- Docker (opcional)
- Git + GitHub
- PGAdmin o extensión PostgreSQL en VS Code
- Postman (pruebas de endpoints)

---

## 🧱 Estructura del repositorio
MedicalCareApp/
├── public/
├── src/
│ ├── assets/ # Imágenes, fuentes, estilos globales
│ ├── components/ # Componentes reutilizables (header, footer, botones)
│ ├── pages/ # Vistas (Home, Login, Dashboard, Nosotros, etc.)
│ ├── services/ # Lógica para conexión con API (fetch)
│ ├── context/ # (opcional) Contexto global de usuario
│ └── App.jsx
├── backend/ # Backend con Express y conexión a PostgreSQL
│ ├── controllers/
│ ├── routes/
│ ├── models/
│ └── server.js
├── .env
├── package.json
└── README.md

---

## 📄 Funcionalidades

### 👤 Afiliados
- Agendar, modificar y cancelar citas médicas
- Consultar resultados de laboratorio
- Ver y descargar órdenes médicas
- Acceder a su historia clínica
- Actualizar sus datos personales

### 🩺 Médicos
- Ver su agenda
- Gestionar historia clínica de pacientes
- Generar órdenes médicas

### 🔐 Seguridad
- Inicio de sesión con validación por rol
- Protecciones con JWT y middleware de autenticación
- Validación de entradas del lado cliente y servidor

---

## ⚙️ Instalación y ejecución local

### 1. Clonar el repositorio

```bash
git clone https://github.com/<usuario>/MedicalCareApp.git
cd MedicalCareApp
```

### 2. Instalar dependencias

```bash
npm install
cd backend && npm install
```

### 3. Configurar variables de entorno
Crear un archivo .env en la raíz del backend con:

PORT=4000
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/saludplus_db
JWT_SECRET=clave_secreta_segura

### 4. Ejecutar la aplicación

### Backend

```bash
cd backend
npm run dev
```

### Frontend

```bash
npm run dev
```
