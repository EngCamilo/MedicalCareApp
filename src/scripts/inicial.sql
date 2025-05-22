-- Crear base de datos 
-- CREATE DATABASE saludplus_db;

USE saludplus_db;

-- 1. Tabla de usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    tipo_documento VARCHAR(20) NOT NULL CHECK (tipo_documento IN ('CC', 'TI', 'CE', 'Pasaporte')),
    documento VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    contrasena_hash VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    telefono_2 VARCHAR(20),
    fecha_nacimiento DATE,
    edad INTEGER,
    direccion TEXT,
    rol VARCHAR(20) NOT NULL CHECK (rol IN ('paciente', 'medico', 'admin')),
    creado_en TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    actualizado_en TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Tabla de especialidades médicas
CREATE TABLE especialidades (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE
);

-- 3. Tabla de médicos
CREATE TABLE medicos (
    usuario_id INTEGER PRIMARY KEY REFERENCES usuarios(id) ON DELETE CASCADE,
    especialidad_id INTEGER NOT NULL REFERENCES especialidades(id),
    registro_profesional VARCHAR(50) UNIQUE,
    telefono VARCHAR(20),
    horario_disponibilidad JSONB
);

-- Trigger para verificar que el usuario tenga rol 'medico'
CREATE OR REPLACE FUNCTION validar_rol_medico()
RETURNS TRIGGER AS $$
DECLARE
    tipo_rol TEXT;
BEGIN
    SELECT rol INTO tipo_rol FROM usuarios WHERE id = NEW.usuario_id;
    IF tipo_rol IS DISTINCT FROM 'medico' THEN
        RAISE EXCEPTION 'El usuario con ID % no tiene rol medico.', NEW.usuario_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_verificar_rol_medico
BEFORE INSERT OR UPDATE ON medicos
FOR EACH ROW EXECUTE FUNCTION validar_rol_medico();

-- 4. Tabla de citas médicas
CREATE TABLE citas (
    id SERIAL PRIMARY KEY,
    paciente_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    medico_id INTEGER NOT NULL REFERENCES medicos(usuario_id) ON DELETE CASCADE,
    fecha_hora TIMESTAMPTZ NOT NULL,
    estado VARCHAR(20) NOT NULL CHECK (estado IN ('pendiente', 'confirmada', 'cancelada', 'finalizada')),
    creado_en TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    actualizado_en TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Tabla de historias clínicas electrónicas
CREATE TABLE historias_clinicas (
    id SERIAL PRIMARY KEY,
    paciente_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    medico_id INTEGER REFERENCES medicos(usuario_id) ON DELETE SET NULL,
    fecha_registro DATE NOT NULL DEFAULT CURRENT_DATE,
    diagnostico TEXT NOT NULL,
    medicamentos TEXT,
    alergias TEXT,
    antecedentes TEXT,
    adjuntos JSONB,
    creado_en TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    actualizado_en TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Tabla de mensajes entre usuarios
CREATE TABLE mensajes (
    id SERIAL PRIMARY KEY,
    remitente_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    destinatario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    contenido TEXT NOT NULL,
    encriptado BOOLEAN NOT NULL DEFAULT TRUE,
    enviado_en TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    leido BOOLEAN NOT NULL DEFAULT FALSE
);

-- 7. Tabla de auditoría
CREATE TABLE auditoria (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id),
    accion VARCHAR(50) NOT NULL,
    tabla_nombre VARCHAR(50) NOT NULL,
    registro_id INTEGER,
    detalles JSONB,
    ocurrido_en TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índices útiles
CREATE INDEX idx_citas_fecha ON citas (fecha_hora);
CREATE INDEX idx_hce_busqueda ON historias_clinicas (paciente_id, medico_id, fecha_registro);
CREATE INDEX idx_mensajes_users ON mensajes (remitente_id, destinatario_id);

-- Función para actualizar el campo actualizado_en
CREATE OR REPLACE FUNCTION actualizar_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.actualizado_en = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para actualizar actualizado_en
CREATE TRIGGER trg_usuarios_updated
BEFORE UPDATE ON usuarios
FOR EACH ROW EXECUTE FUNCTION actualizar_timestamp();

CREATE TRIGGER trg_citas_updated
BEFORE UPDATE ON citas
FOR EACH ROW EXECUTE FUNCTION actualizar_timestamp();

CREATE TRIGGER trg_historias_clinicas_updated
BEFORE UPDATE ON historias_clinicas
FOR EACH ROW EXECUTE FUNCTION actualizar_timestamp();