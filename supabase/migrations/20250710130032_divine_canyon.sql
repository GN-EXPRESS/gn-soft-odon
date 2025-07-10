/*
  # Base de datos completa para GN SOFT ODONTOLÓGICO

  1. Nuevas Tablas
    - `clinicas` - Información de clínicas odontológicas
    - `perfiles_usuario` - Perfiles de usuarios del sistema
    - `pacientes` - Información de pacientes
    - `profesionales` - Información de profesionales
    - `citas` - Gestión de citas médicas
    - `historiales_medicos` - Historiales médicos de pacientes
    - `odontogramas` - Odontogramas digitales
    - `estudios_radiograficos` - Estudios y radiografías
    - `recetas_medicas` - Recetas digitales
    - `membresias` - Gestión de membresías
    - `pagos` - Registro de pagos
    - `formularios_medicos` - Formularios médicos completos

  2. Seguridad
    - Habilitar RLS en todas las tablas
    - Políticas de acceso basadas en roles
    - Protección de datos sensibles
*/

-- Crear tabla de clínicas
CREATE TABLE IF NOT EXISTS clinicas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre text NOT NULL,
  direccion text NOT NULL,
  telefono text NOT NULL,
  email text NOT NULL,
  ruc text,
  logo_url text,
  configuracion jsonb DEFAULT '{}',
  estado text DEFAULT 'activa' CHECK (estado IN ('activa', 'inactiva', 'suspendida')),
  fecha_creacion timestamptz DEFAULT now(),
  fecha_actualizacion timestamptz DEFAULT now()
);

-- Crear tabla de perfiles de usuario
CREATE TABLE IF NOT EXISTS perfiles_usuario (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  nombre text NOT NULL,
  apellido text,
  telefono text,
  fecha_nacimiento date,
  genero text CHECK (genero IN ('masculino', 'femenino', 'otro')),
  direccion text,
  rol text NOT NULL DEFAULT 'paciente' CHECK (rol IN ('administrador', 'profesional', 'paciente')),
  especialidad text,
  numero_licencia text,
  clinica_id uuid REFERENCES clinicas(id),
  avatar_url text,
  configuracion jsonb DEFAULT '{}',
  estado text DEFAULT 'activo' CHECK (estado IN ('activo', 'inactivo', 'suspendido')),
  fecha_creacion timestamptz DEFAULT now(),
  fecha_actualizacion timestamptz DEFAULT now()
);

-- Crear tabla de pacientes
CREATE TABLE IF NOT EXISTS pacientes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  nombre text NOT NULL,
  apellido text NOT NULL,
  fecha_nacimiento date NOT NULL,
  genero text CHECK (genero IN ('masculino', 'femenino', 'otro')),
  telefono text NOT NULL,
  email text,
  direccion text,
  ocupacion text,
  estado_civil text,
  contacto_emergencia_nombre text,
  contacto_emergencia_telefono text,
  numero_documento text,
  tipo_documento text DEFAULT 'ci' CHECK (tipo_documento IN ('ci', 'pasaporte', 'ruc')),
  alergias text[],
  medicamentos_actuales text[],
  enfermedades_preexistentes text[],
  tutor_id uuid REFERENCES pacientes(id),
  es_menor boolean DEFAULT false,
  clinica_id uuid REFERENCES clinicas(id),
  estado text DEFAULT 'activo' CHECK (estado IN ('activo', 'inactivo')),
  fecha_creacion timestamptz DEFAULT now(),
  fecha_actualizacion timestamptz DEFAULT now()
);

-- Crear tabla de profesionales
CREATE TABLE IF NOT EXISTS profesionales (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  nombre text NOT NULL,
  apellido text NOT NULL,
  especialidad text NOT NULL,
  numero_licencia text UNIQUE NOT NULL,
  telefono text NOT NULL,
  email text NOT NULL,
  fecha_nacimiento date,
  direccion text,
  experiencia_anos integer DEFAULT 0,
  formacion text[],
  certificaciones text[],
  horario_atencion jsonb DEFAULT '{}',
  clinica_id uuid REFERENCES clinicas(id),
  estado text DEFAULT 'activo' CHECK (estado IN ('activo', 'inactivo', 'suspendido')),
  fecha_creacion timestamptz DEFAULT now(),
  fecha_actualizacion timestamptz DEFAULT now()
);

-- Crear tabla de citas
CREATE TABLE IF NOT EXISTS citas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  paciente_id uuid REFERENCES pacientes(id) ON DELETE CASCADE,
  profesional_id uuid REFERENCES profesionales(id) ON DELETE CASCADE,
  clinica_id uuid REFERENCES clinicas(id),
  fecha_cita timestamptz NOT NULL,
  duracion_minutos integer DEFAULT 30,
  tipo_cita text DEFAULT 'consulta' CHECK (tipo_cita IN ('consulta', 'tratamiento', 'seguimiento', 'emergencia')),
  estado text DEFAULT 'programada' CHECK (estado IN ('programada', 'confirmada', 'en_curso', 'completada', 'cancelada', 'no_asistio')),
  motivo text,
  observaciones text,
  costo_consulta numeric(10,2),
  metodo_pago text,
  fecha_creacion timestamptz DEFAULT now(),
  fecha_actualizacion timestamptz DEFAULT now()
);

-- Crear tabla de historiales médicos
CREATE TABLE IF NOT EXISTS historiales_medicos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  paciente_id uuid REFERENCES pacientes(id) ON DELETE CASCADE,
  profesional_id uuid REFERENCES profesionales(id),
  cita_id uuid REFERENCES citas(id),
  clinica_id uuid REFERENCES clinicas(id),
  fecha_atencion timestamptz NOT NULL,
  diagnostico text,
  tratamiento_realizado text,
  procedimientos text[],
  medicamentos_recetados text[],
  observaciones text,
  recomendaciones text,
  proxima_cita timestamptz,
  costo_tratamiento numeric(10,2),
  estado text DEFAULT 'activo' CHECK (estado IN ('activo', 'completado', 'cancelado')),
  fecha_creacion timestamptz DEFAULT now(),
  fecha_actualizacion timestamptz DEFAULT now()
);

-- Crear tabla de odontogramas
CREATE TABLE IF NOT EXISTS odontogramas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  paciente_id uuid REFERENCES pacientes(id) ON DELETE CASCADE,
  profesional_id uuid REFERENCES profesionales(id),
  historial_id uuid REFERENCES historiales_medicos(id),
  fecha_creacion timestamptz DEFAULT now(),
  piezas_dentales jsonb NOT NULL DEFAULT '{}',
  observaciones text,
  estado text DEFAULT 'activo' CHECK (estado IN ('activo', 'archivado')),
  fecha_actualizacion timestamptz DEFAULT now()
);

-- Crear tabla de estudios radiográficos
CREATE TABLE IF NOT EXISTS estudios_radiograficos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  paciente_id uuid REFERENCES pacientes(id) ON DELETE CASCADE,
  profesional_id uuid REFERENCES profesionales(id),
  historial_id uuid REFERENCES historiales_medicos(id),
  clinica_id uuid REFERENCES clinicas(id),
  tipo_estudio text NOT NULL,
  fecha_estudio timestamptz NOT NULL,
  descripcion text,
  resultados text,
  archivo_url text,
  archivo_nombre text,
  archivo_tipo text,
  es_confidencial boolean DEFAULT false,
  fecha_creacion timestamptz DEFAULT now(),
  fecha_actualizacion timestamptz DEFAULT now()
);

-- Crear tabla de recetas médicas
CREATE TABLE IF NOT EXISTS recetas_medicas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  paciente_id uuid REFERENCES pacientes(id) ON DELETE CASCADE,
  profesional_id uuid REFERENCES profesionales(id),
  historial_id uuid REFERENCES historiales_medicos(id),
  clinica_id uuid REFERENCES clinicas(id),
  fecha_emision timestamptz NOT NULL DEFAULT now(),
  medicamentos jsonb NOT NULL DEFAULT '[]',
  indicaciones text,
  duracion_tratamiento text,
  observaciones text,
  codigo_qr text,
  estado text DEFAULT 'activa' CHECK (estado IN ('activa', 'utilizada', 'vencida', 'cancelada')),
  fecha_vencimiento timestamptz,
  fecha_creacion timestamptz DEFAULT now(),
  fecha_actualizacion timestamptz DEFAULT now()
);

-- Crear tabla de membresías
CREATE TABLE IF NOT EXISTS membresias (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  clinica_id uuid REFERENCES clinicas(id) ON DELETE CASCADE,
  tipo_plan text NOT NULL DEFAULT 'basico' CHECK (tipo_plan IN ('basico', 'profesional', 'premium')),
  estado text DEFAULT 'activa' CHECK (estado IN ('activa', 'suspendida', 'cancelada', 'vencida')),
  fecha_inicio timestamptz NOT NULL,
  fecha_vencimiento timestamptz NOT NULL,
  precio_mensual numeric(10,2) NOT NULL,
  moneda text DEFAULT 'PYG',
  limite_pacientes integer,
  limite_profesionales integer,
  caracteristicas jsonb DEFAULT '{}',
  periodo_prueba boolean DEFAULT false,
  fecha_creacion timestamptz DEFAULT now(),
  fecha_actualizacion timestamptz DEFAULT now()
);

-- Crear tabla de pagos
CREATE TABLE IF NOT EXISTS pagos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  clinica_id uuid REFERENCES clinicas(id) ON DELETE CASCADE,
  membresia_id uuid REFERENCES membresias(id),
  paciente_id uuid REFERENCES pacientes(id),
  concepto text NOT NULL,
  monto numeric(10,2) NOT NULL,
  moneda text DEFAULT 'PYG',
  metodo_pago text,
  estado text DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'pagado', 'cancelado', 'reembolsado')),
  fecha_vencimiento timestamptz,
  fecha_pago timestamptz,
  referencia_pago text,
  observaciones text,
  fecha_creacion timestamptz DEFAULT now(),
  fecha_actualizacion timestamptz DEFAULT now()
);

-- Crear tabla de formularios médicos
CREATE TABLE IF NOT EXISTS formularios_medicos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  paciente_id uuid REFERENCES pacientes(id) ON DELETE CASCADE,
  profesional_id uuid REFERENCES profesionales(id),
  clinica_id uuid REFERENCES clinicas(id),
  tipo_formulario text NOT NULL,
  fecha_llenado timestamptz NOT NULL DEFAULT now(),
  datos_formulario jsonb NOT NULL DEFAULT '{}',
  consentimiento_firmado boolean DEFAULT false,
  estado text DEFAULT 'completado' CHECK (estado IN ('borrador', 'completado', 'revisado', 'archivado')),
  fecha_creacion timestamptz DEFAULT now(),
  fecha_actualizacion timestamptz DEFAULT now()
);

-- Habilitar RLS en todas las tablas
ALTER TABLE clinicas ENABLE ROW LEVEL SECURITY;
ALTER TABLE perfiles_usuario ENABLE ROW LEVEL SECURITY;
ALTER TABLE pacientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE profesionales ENABLE ROW LEVEL SECURITY;
ALTER TABLE citas ENABLE ROW LEVEL SECURITY;
ALTER TABLE historiales_medicos ENABLE ROW LEVEL SECURITY;
ALTER TABLE odontogramas ENABLE ROW LEVEL SECURITY;
ALTER TABLE estudios_radiograficos ENABLE ROW LEVEL SECURITY;
ALTER TABLE recetas_medicas ENABLE ROW LEVEL SECURITY;
ALTER TABLE membresias ENABLE ROW LEVEL SECURITY;
ALTER TABLE pagos ENABLE ROW LEVEL SECURITY;
ALTER TABLE formularios_medicos ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad para perfiles_usuario
CREATE POLICY "Los usuarios pueden ver su propio perfil"
  ON perfiles_usuario FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Los usuarios pueden actualizar su propio perfil"
  ON perfiles_usuario FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Los usuarios pueden insertar su propio perfil"
  ON perfiles_usuario FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Políticas de seguridad para clínicas
CREATE POLICY "Los miembros de la clínica pueden ver datos de su clínica"
  ON clinicas FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM perfiles_usuario
      WHERE perfiles_usuario.id = auth.uid()
      AND perfiles_usuario.clinica_id = clinicas.id
    )
  );

-- Políticas de seguridad para pacientes
CREATE POLICY "Los pacientes pueden ver sus propios datos"
  ON pacientes FOR SELECT
  TO authenticated
  USING (
    usuario_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM perfiles_usuario
      WHERE perfiles_usuario.id = auth.uid()
      AND perfiles_usuario.clinica_id = pacientes.clinica_id
      AND perfiles_usuario.rol IN ('administrador', 'profesional')
    )
  );

-- Políticas de seguridad para citas
CREATE POLICY "Los usuarios pueden ver sus citas relacionadas"
  ON citas FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM pacientes
      WHERE pacientes.id = citas.paciente_id
      AND pacientes.usuario_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM profesionales
      WHERE profesionales.id = citas.profesional_id
      AND profesionales.usuario_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM perfiles_usuario
      WHERE perfiles_usuario.id = auth.uid()
      AND perfiles_usuario.clinica_id = citas.clinica_id
      AND perfiles_usuario.rol = 'administrador'
    )
  );

-- Políticas de seguridad para historiales médicos
CREATE POLICY "Los usuarios pueden ver historiales médicos relacionados"
  ON historiales_medicos FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM pacientes
      WHERE pacientes.id = historiales_medicos.paciente_id
      AND pacientes.usuario_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM profesionales
      WHERE profesionales.id = historiales_medicos.profesional_id
      AND profesionales.usuario_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM perfiles_usuario
      WHERE perfiles_usuario.id = auth.uid()
      AND perfiles_usuario.clinica_id = historiales_medicos.clinica_id
      AND perfiles_usuario.rol = 'administrador'
    )
  );

-- Índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_perfiles_usuario_clinica ON perfiles_usuario(clinica_id);
CREATE INDEX IF NOT EXISTS idx_perfiles_usuario_rol ON perfiles_usuario(rol);
CREATE INDEX IF NOT EXISTS idx_pacientes_clinica ON pacientes(clinica_id);
CREATE INDEX IF NOT EXISTS idx_pacientes_usuario ON pacientes(usuario_id);
CREATE INDEX IF NOT EXISTS idx_profesionales_clinica ON profesionales(clinica_id);
CREATE INDEX IF NOT EXISTS idx_profesionales_usuario ON profesionales(usuario_id);
CREATE INDEX IF NOT EXISTS idx_citas_fecha ON citas(fecha_cita);
CREATE INDEX IF NOT EXISTS idx_citas_paciente ON citas(paciente_id);
CREATE INDEX IF NOT EXISTS idx_citas_profesional ON citas(profesional_id);
CREATE INDEX IF NOT EXISTS idx_historiales_paciente ON historiales_medicos(paciente_id);
CREATE INDEX IF NOT EXISTS idx_historiales_fecha ON historiales_medicos(fecha_atencion);
CREATE INDEX IF NOT EXISTS idx_estudios_paciente ON estudios_radiograficos(paciente_id);
CREATE INDEX IF NOT EXISTS idx_recetas_paciente ON recetas_medicas(paciente_id);
CREATE INDEX IF NOT EXISTS idx_membresias_clinica ON membresias(clinica_id);
CREATE INDEX IF NOT EXISTS idx_pagos_clinica ON pagos(clinica_id);

-- Funciones para actualizar timestamps
CREATE OR REPLACE FUNCTION actualizar_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.fecha_actualizacion = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para actualizar timestamps automáticamente
CREATE TRIGGER actualizar_clinicas_timestamp
  BEFORE UPDATE ON clinicas
  FOR EACH ROW EXECUTE FUNCTION actualizar_timestamp();

CREATE TRIGGER actualizar_perfiles_usuario_timestamp
  BEFORE UPDATE ON perfiles_usuario
  FOR EACH ROW EXECUTE FUNCTION actualizar_timestamp();

CREATE TRIGGER actualizar_pacientes_timestamp
  BEFORE UPDATE ON pacientes
  FOR EACH ROW EXECUTE FUNCTION actualizar_timestamp();

CREATE TRIGGER actualizar_profesionales_timestamp
  BEFORE UPDATE ON profesionales
  FOR EACH ROW EXECUTE FUNCTION actualizar_timestamp();

CREATE TRIGGER actualizar_citas_timestamp
  BEFORE UPDATE ON citas
  FOR EACH ROW EXECUTE FUNCTION actualizar_timestamp();

CREATE TRIGGER actualizar_historiales_timestamp
  BEFORE UPDATE ON historiales_medicos
  FOR EACH ROW EXECUTE FUNCTION actualizar_timestamp();

CREATE TRIGGER actualizar_odontogramas_timestamp
  BEFORE UPDATE ON odontogramas
  FOR EACH ROW EXECUTE FUNCTION actualizar_timestamp();

CREATE TRIGGER actualizar_estudios_timestamp
  BEFORE UPDATE ON estudios_radiograficos
  FOR EACH ROW EXECUTE FUNCTION actualizar_timestamp();

CREATE TRIGGER actualizar_recetas_timestamp
  BEFORE UPDATE ON recetas_medicas
  FOR EACH ROW EXECUTE FUNCTION actualizar_timestamp();

CREATE TRIGGER actualizar_membresias_timestamp
  BEFORE UPDATE ON membresias
  FOR EACH ROW EXECUTE FUNCTION actualizar_timestamp();

CREATE TRIGGER actualizar_pagos_timestamp
  BEFORE UPDATE ON pagos
  FOR EACH ROW EXECUTE FUNCTION actualizar_timestamp();

CREATE TRIGGER actualizar_formularios_timestamp
  BEFORE UPDATE ON formularios_medicos
  FOR EACH ROW EXECUTE FUNCTION actualizar_timestamp();