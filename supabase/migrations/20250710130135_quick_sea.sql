/*
  # Datos de prueba para GN SOFT ODONTOLÓGICO

  1. Datos de prueba
    - Clínica de ejemplo
    - Profesionales de ejemplo
    - Pacientes de ejemplo
    - Citas de ejemplo
    - Historiales de ejemplo
    - Membresía de ejemplo

  2. Configuración inicial
    - Configuración de la clínica
    - Horarios de atención
    - Precios por defecto
*/

-- Insertar clínica de ejemplo
INSERT INTO clinicas (id, nombre, direccion, telefono, email, ruc, configuracion) VALUES
(
  '11111111-1111-1111-1111-111111111111',
  'Clínica Dental San Rafael',
  'Av. España 1234, Asunción',
  '021-123456',
  'info@clinicasanrafael.com.py',
  '80123456-7',
  '{
    "horario_atencion": {
      "lunes": {"inicio": "08:00", "fin": "18:00"},
      "martes": {"inicio": "08:00", "fin": "18:00"},
      "miercoles": {"inicio": "08:00", "fin": "18:00"},
      "jueves": {"inicio": "08:00", "fin": "18:00"},
      "viernes": {"inicio": "08:00", "fin": "17:00"},
      "sabado": {"inicio": "08:00", "fin": "12:00"},
      "domingo": {"cerrado": true}
    },
    "precios": {
      "consulta": 150000,
      "limpieza": 200000,
      "extraccion": 250000,
      "endodoncia": 800000,
      "ortodoncia_consulta": 300000
    },
    "configuracion_citas": {
      "duracion_defecto": 30,
      "anticipacion_minima": 60,
      "cancelacion_horas": 24
    }
  }'
);

-- Insertar profesionales de ejemplo
INSERT INTO profesionales (id, nombre, apellido, especialidad, numero_licencia, telefono, email, experiencia_anos, formacion, clinica_id) VALUES
(
  '22222222-2222-2222-2222-222222222222',
  'Juan Carlos',
  'Pérez González',
  'Odontología General',
  'ODO-001-2020',
  '0981-123456',
  'dr.perez@clinicasanrafael.com.py',
  8,
  '{"Universidad Nacional de Asunción - Odontología", "Especialización en Endodoncia"}',
  '11111111-1111-1111-1111-111111111111'
),
(
  '33333333-3333-3333-3333-333333333333',
  'María Elena',
  'Martínez Silva',
  'Ortodoncia',
  'ODO-002-2018',
  '0982-654321',
  'dra.martinez@clinicasanrafael.com.py',
  12,
  '{"Universidad Católica - Odontología", "Maestría en Ortodoncia", "Certificación en Invisalign"}',
  '11111111-1111-1111-1111-111111111111'
),
(
  '44444444-4444-4444-4444-444444444444',
  'Roberto Antonio',
  'Silva Rodríguez',
  'Cirugía Oral',
  'ODO-003-2019',
  '0983-789012',
  'dr.silva@clinicasanrafael.com.py',
  6,
  '{"Universidad del Norte - Odontología", "Especialización en Cirugía Oral"}',
  '11111111-1111-1111-1111-111111111111'
);

-- Insertar pacientes de ejemplo
INSERT INTO pacientes (id, nombre, apellido, fecha_nacimiento, genero, telefono, email, direccion, numero_documento, alergias, medicamentos_actuales, clinica_id) VALUES
(
  '55555555-5555-5555-5555-555555555555',
  'María José',
  'González López',
  '1990-05-15',
  'femenino',
  '0984-111222',
  'maria.gonzalez@email.com',
  'Barrio San Jorge, Asunción',
  '1234567',
  '{"penicilina"}',
  '{"ibuprofeno 600mg"}',
  '11111111-1111-1111-1111-111111111111'
),
(
  '66666666-6666-6666-6666-666666666666',
  'Carlos Alberto',
  'Rodríguez Benítez',
  '1985-03-20',
  'masculino',
  '0985-333444',
  'carlos.rodriguez@email.com',
  'Villa Elisa, Central',
  '2345678',
  '{}',
  '{}',
  '11111111-1111-1111-1111-111111111111'
),
(
  '77777777-7777-7777-7777-777777777777',
  'Ana Sofía',
  'Martínez Cabrera',
  '1995-08-10',
  'femenino',
  '0986-555666',
  'ana.martinez@email.com',
  'Lambaré, Central',
  '3456789',
  '{}',
  '{}',
  '11111111-1111-1111-1111-111111111111'
),
(
  '88888888-8888-8888-8888-888888888888',
  'Luis Fernando',
  'Domínguez Sosa',
  '1978-12-05',
  'masculino',
  '0987-777888',
  'luis.dominguez@email.com',
  'Fernando de la Mora, Central',
  '4567890',
  '{"aspirina"}',
  '{"losartán 50mg"}',
  '11111111-1111-1111-1111-111111111111'
);

-- Insertar citas de ejemplo
INSERT INTO citas (id, paciente_id, profesional_id, clinica_id, fecha_cita, duracion_minutos, tipo_cita, estado, motivo, costo_consulta) VALUES
(
  '99999999-9999-9999-9999-999999999999',
  '55555555-5555-5555-5555-555555555555',
  '22222222-2222-2222-2222-222222222222',
  '11111111-1111-1111-1111-111111111111',
  '2024-01-15 09:00:00',
  30,
  'consulta',
  'completada',
  'Limpieza dental de rutina',
  150000
),
(
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  '66666666-6666-6666-6666-666666666666',
  '33333333-3333-3333-3333-333333333333',
  '11111111-1111-1111-1111-111111111111',
  '2024-01-10 10:30:00',
  60,
  'tratamiento',
  'completada',
  'Endodoncia pieza 16',
  800000
),
(
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
  '77777777-7777-7777-7777-777777777777',
  '33333333-3333-3333-3333-333333333333',
  '11111111-1111-1111-1111-111111111111',
  '2024-01-20 14:00:00',
  45,
  'seguimiento',
  'programada',
  'Control de ortodoncia',
  300000
);

-- Insertar historiales médicos de ejemplo
INSERT INTO historiales_medicos (id, paciente_id, profesional_id, cita_id, clinica_id, fecha_atencion, diagnostico, tratamiento_realizado, procedimientos, observaciones, recomendaciones, costo_tratamiento) VALUES
(
  'cccccccc-cccc-cccc-cccc-cccccccccccc',
  '55555555-5555-5555-5555-555555555555',
  '22222222-2222-2222-2222-222222222222',
  '99999999-9999-9999-9999-999999999999',
  '11111111-1111-1111-1111-111111111111',
  '2024-01-15 09:00:00',
  'Gingivitis leve, cálculo dental',
  'Limpieza dental profunda y fluorización',
  '{"limpieza", "fluorización", "pulido"}',
  'Paciente presenta buena colaboración. Sangrado leve durante la limpieza.',
  'Usar hilo dental diariamente. Control en 6 meses.',
  200000
),
(
  'dddddddd-dddd-dddd-dddd-dddddddddddd',
  '66666666-6666-6666-6666-666666666666',
  '33333333-3333-3333-3333-333333333333',
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  '11111111-1111-1111-1111-111111111111',
  '2024-01-10 10:30:00',
  'Caries profunda pieza 16 con compromiso pulpar',
  'Endodoncia pieza 16 - Primera sesión',
  '{"acceso_camara_pulpar", "instrumentacion", "medicacion_temporal"}',
  'Pieza con dolor intenso. Se realizó apertura y medicación temporal.',
  'Continuar con segunda sesión en 1 semana. Evitar masticar del lado afectado.',
  1200000
);

-- Insertar odontogramas de ejemplo
INSERT INTO odontogramas (id, paciente_id, profesional_id, historial_id, piezas_dentales, observaciones) VALUES
(
  'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee',
  '55555555-5555-5555-5555-555555555555',
  '22222222-2222-2222-2222-222222222222',
  'cccccccc-cccc-cccc-cccc-cccccccccccc',
  '{
    "11": {"estado": "sano", "tratamientos": ["limpieza"]},
    "12": {"estado": "sano", "tratamientos": ["limpieza"]},
    "13": {"estado": "sano", "tratamientos": ["limpieza"]},
    "14": {"estado": "sano", "tratamientos": ["limpieza"]},
    "15": {"estado": "sano", "tratamientos": ["limpieza"]},
    "16": {"estado": "sano", "tratamientos": ["limpieza"]},
    "17": {"estado": "sano", "tratamientos": ["limpieza"]},
    "18": {"estado": "ausente", "tratamientos": []},
    "21": {"estado": "sano", "tratamientos": ["limpieza"]},
    "22": {"estado": "sano", "tratamientos": ["limpieza"]},
    "23": {"estado": "sano", "tratamientos": ["limpieza"]},
    "24": {"estado": "sano", "tratamientos": ["limpieza"]},
    "25": {"estado": "sano", "tratamientos": ["limpieza"]},
    "26": {"estado": "sano", "tratamientos": ["limpieza"]},
    "27": {"estado": "sano", "tratamientos": ["limpieza"]},
    "28": {"estado": "ausente", "tratamientos": []}
  }',
  'Odontograma post-limpieza. Estado general bueno.'
),
(
  'ffffffff-ffff-ffff-ffff-ffffffffffff',
  '66666666-6666-6666-6666-666666666666',
  '33333333-3333-3333-3333-333333333333',
  'dddddddd-dddd-dddd-dddd-dddddddddddd',
  '{
    "16": {"estado": "endodoncia_iniciada", "tratamientos": ["endodoncia"], "observaciones": "Primera sesión realizada"}
  }',
  'Endodoncia iniciada en pieza 16. Pendiente segunda sesión.'
);

-- Insertar estudios radiográficos de ejemplo
INSERT INTO estudios_radiograficos (id, paciente_id, profesional_id, historial_id, clinica_id, tipo_estudio, fecha_estudio, descripcion, resultados, archivo_nombre) VALUES
(
  'gggggggg-gggg-gggg-gggg-gggggggggggg',
  '55555555-5555-5555-5555-555555555555',
  '22222222-2222-2222-2222-222222222222',
  'cccccccc-cccc-cccc-cccc-cccccccccccc',
  '11111111-1111-1111-1111-111111111111',
  'Radiografía periapical',
  '2024-01-15 09:30:00',
  'Radiografía de control post-limpieza',
  'Sin hallazgos patológicos. Estructura dental normal.',
  'rx_periapical_maria_gonzalez_20240115.pdf'
),
(
  'hhhhhhhh-hhhh-hhhh-hhhh-hhhhhhhhhhhh',
  '66666666-6666-6666-6666-666666666666',
  '33333333-3333-3333-3333-333333333333',
  'dddddddd-dddd-dddd-dddd-dddddddddddd',
  '11111111-1111-1111-1111-111111111111',
  'Radiografía panorámica',
  '2024-01-10 10:00:00',
  'Radiografía previa a endodoncia',
  'Caries profunda en pieza 16 con compromiso pulpar. Imagen radiolúcida en cámara pulpar.',
  'rx_panoramica_carlos_rodriguez_20240110.pdf'
);

-- Insertar recetas médicas de ejemplo
INSERT INTO recetas_medicas (id, paciente_id, profesional_id, historial_id, clinica_id, fecha_emision, medicamentos, indicaciones, duracion_tratamiento, codigo_qr) VALUES
(
  'iiiiiiii-iiii-iiii-iiii-iiiiiiiiiiii',
  '55555555-5555-5555-5555-555555555555',
  '22222222-2222-2222-2222-222222222222',
  'cccccccc-cccc-cccc-cccc-cccccccccccc',
  '11111111-1111-1111-1111-111111111111',
  '2024-01-15 09:45:00',
  '[
    {
      "nombre": "Ibuprofeno 600mg",
      "dosis": "1 comprimido cada 8 horas",
      "cantidad": "9 comprimidos",
      "indicaciones": "Tomar después de las comidas"
    },
    {
      "nombre": "Enjuague bucal con clorhexidina",
      "dosis": "15ml cada 12 horas",
      "cantidad": "1 frasco de 250ml",
      "indicaciones": "Enjuagar por 30 segundos sin tragar"
    }
  ]',
  'Tomar ibuprofeno solo si hay dolor o inflamación. Usar enjuague bucal durante 1 semana.',
  '3 días ibuprofeno, 1 semana enjuague',
  'GN-REC-20240115-001'
),
(
  'jjjjjjjj-jjjj-jjjj-jjjj-jjjjjjjjjjjj',
  '66666666-6666-6666-6666-666666666666',
  '33333333-3333-3333-3333-333333333333',
  'dddddddd-dddd-dddd-dddd-dddddddddddd',
  '11111111-1111-1111-1111-111111111111',
  '2024-01-10 11:00:00',
  '[
    {
      "nombre": "Amoxicilina 500mg",
      "dosis": "1 cápsula cada 8 horas",
      "cantidad": "21 cápsulas",
      "indicaciones": "Tomar con alimentos"
    },
    {
      "nombre": "Paracetamol 500mg",
      "dosis": "1 comprimido cada 6 horas",
      "cantidad": "12 comprimidos",
      "indicaciones": "Solo si hay dolor"
    }
  ]',
  'Completar todo el tratamiento antibiótico. Paracetamol solo para dolor.',
  '7 días',
  'GN-REC-20240110-002'
);

-- Insertar membresía de ejemplo
INSERT INTO membresias (id, clinica_id, tipo_plan, fecha_inicio, fecha_vencimiento, precio_mensual, limite_pacientes, limite_profesionales, caracteristicas, periodo_prueba) VALUES
(
  'kkkkkkkk-kkkk-kkkk-kkkk-kkkkkkkkkkkk',
  '11111111-1111-1111-1111-111111111111',
  'profesional',
  '2024-01-01 00:00:00',
  '2024-12-31 23:59:59',
  450000,
  1000,
  10,
  '{
    "historiales_ilimitados": true,
    "estudios_radiograficos": true,
    "recetas_digitales": true,
    "odontogramas": true,
    "reportes_avanzados": true,
    "soporte_24_7": true,
    "backup_automatico": true
  }',
  false
);

-- Insertar formularios médicos de ejemplo
INSERT INTO formularios_medicos (id, paciente_id, profesional_id, clinica_id, tipo_formulario, datos_formulario, consentimiento_firmado) VALUES
(
  'llllllll-llll-llll-llll-llllllllllll',
  '55555555-5555-5555-5555-555555555555',
  '22222222-2222-2222-2222-222222222222',
  '11111111-1111-1111-1111-111111111111',
  'ficha_medica_inicial',
  '{
    "antecedentes_familiares": {
      "diabetes": false,
      "hipertension": false,
      "enfermedades_cardiacas": false,
      "cancer": false
    },
    "antecedentes_personales": {
      "diabetes": false,
      "hipertension": false,
      "enfermedades_cardiacas": false,
      "problemas_renales": false,
      "alergias": ["penicilina"],
      "cirugias_previas": [],
      "medicamentos_actuales": ["ibuprofeno 600mg"]
    },
    "habitos": {
      "fumador": false,
      "alcohol": "ocasional",
      "drogas": false,
      "ejercicio": "regular"
    },
    "motivo_consulta": "Limpieza dental de rutina",
    "sintomas_actuales": "Ninguno",
    "expectativas": "Mantener salud oral"
  }',
  true
);