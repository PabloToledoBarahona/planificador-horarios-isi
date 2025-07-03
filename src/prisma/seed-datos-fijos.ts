import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const materiasPorSemestre: { nivel: number; nombre: string }[] = [
    // Primer semestre
    { nivel: 1, nombre: 'Animación digital' },
    { nivel: 1, nombre: 'Fundamentos de desarrollo de software' },
    { nivel: 1, nombre: 'Fundamentos de las ciencias de la computación' },
    { nivel: 1, nombre: 'Programación I' },
    { nivel: 1, nombre: 'Inglés técnico I' },

    // Segundo semestre
    { nivel: 2, nombre: 'Base de datos I' },
    { nivel: 2, nombre: 'Electrónica digital aplicada' },
    { nivel: 2, nombre: 'Programación II' },
    { nivel: 2, nombre: 'Programación web I' },
    { nivel: 2, nombre: 'Sistemas operativos' },

    // Tercer semestre
    { nivel: 3, nombre: 'Base de datos II' },
    { nivel: 3, nombre: 'IOT y Robótica' },
    { nivel: 3, nombre: 'Programación móvil I' },
    { nivel: 3, nombre: 'Programación III' },
    { nivel: 3, nombre: 'Programación web II' },

    // Cuarto semestre
    { nivel: 4, nombre: 'Base de datos III' },
    { nivel: 4, nombre: 'Game Development' },
    { nivel: 4, nombre: 'Ingeniería de software' },
    { nivel: 4, nombre: 'Programación móvil II' },
    { nivel: 4, nombre: 'Proyecto de sistemas I' },

    // Quinto semestre
    { nivel: 5, nombre: 'Procesamiento digital de imágenes' },
    { nivel: 5, nombre: 'Proyecto de sistemas II' },
    { nivel: 5, nombre: 'Redes y comunicación de datos I' },
    { nivel: 5, nombre: 'DatawareHousing' },
    { nivel: 5, nombre: 'Estadística computacional' },

    // Sexto semestre
    { nivel: 6, nombre: 'Proyecto de sistemas III' },
    { nivel: 6, nombre: 'Realidad virtual y aumentada' },
    { nivel: 6, nombre: 'Redes y comunicación de datos II' },
    { nivel: 6, nombre: 'Software Quality Assurance' },
    { nivel: 6, nombre: 'Tecnologías emergentes I' },

    // Séptimo semestre
    { nivel: 7, nombre: 'Management information systems' },
    { nivel: 7, nombre: 'Auditoría y seguridad informática' },
    { nivel: 7, nombre: 'Software Project Management' },
    { nivel: 7, nombre: 'Sistemas distribuidos' },
    { nivel: 7, nombre: 'Taller de sistemas I' },

    // Octavo semestre
    { nivel: 8, nombre: 'Taller de sistemas II' },
    { nivel: 8, nombre: 'Práctica profesional' },
    { nivel: 8, nombre: 'Proyecto de grado' }
  ];

  const ambientes: { nombre: string; tipo: 'teorica' | 'practica'; capacidad: number }[] = [
    // Módulo PG (teóricas, 50)
    { nombre: 'PG-601', tipo: 'teorica', capacidad: 50 },
    { nombre: 'PG-602', tipo: 'teorica', capacidad: 50 },
    { nombre: 'PG-605', tipo: 'teorica', capacidad: 50 },

    // Módulo de sistemas (prácticas, 20)
    { nombre: 'T001', tipo: 'practica', capacidad: 20 },
    { nombre: 'T002', tipo: 'practica', capacidad: 20 },
    { nombre: 'T003', tipo: 'practica', capacidad: 20 },
    { nombre: 'T004', tipo: 'practica', capacidad: 20 },
    { nombre: 'T402', tipo: 'practica', capacidad: 20 },
    { nombre: 'T403', tipo: 'practica', capacidad: 20 },
    { nombre: 'T404', tipo: 'practica', capacidad: 20 },

    // Módulo de medicina (teórica, 50)
    { nombre: 'MB-106', tipo: 'teorica', capacidad: 50 }
  ];

  for (const materia of materiasPorSemestre) {
    await prisma.materia.upsert({
      where: { nombre: materia.nombre },
      update: {},
      create: {
        nombre: materia.nombre,
        nivel: materia.nivel,
        horas: 4,
        tipoAula: 'teorica'
      }
    });
  }

  for (const ambiente of ambientes) {
    await prisma.ambiente.upsert({
      where: { nombre: ambiente.nombre },
      update: {},
      create: {
        nombre: ambiente.nombre,
        tipo: ambiente.tipo,
        capacidad: ambiente.capacidad
      }
    });
  }

  console.log('Materias y ambientes insertados correctamente.');
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error('Error al insertar datos:', e);
    prisma.$disconnect();
    process.exit(1);
  });