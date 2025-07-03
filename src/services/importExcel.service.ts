import { prisma } from '@prisma/db';
import { z } from 'zod';
import {
  DocenteExcel,
  DisponibilidadExcel,
  GrupoExcel,
} from '../types/types';

// Esquemas de validación con Zod
const docenteSchema = z.object({
  nombre: z.string().min(1),
  email: z.string().email(),
  cargaMaxima: z.number().int().nonnegative(),
});

const disponibilidadSchema = z.object({
  docenteEmail: z.string().email(),
  dia: z.string().min(1),
  bloque: z.number().int().nonnegative(),
});

const grupoSchema = z.object({
  materia: z.string().min(1),
  letra: z.string().min(1),
});

/**
 * Inserta docentes desde Excel, evitando duplicados por email.
 */
export async function insertarDocentes(docentes: DocenteExcel[]) {
  let insertados = 0;
  let omitidos = 0;

  for (const raw of docentes) {
    const parsed = docenteSchema.safeParse(raw);

    if (!parsed.success) {
      console.warn('Docente inválido, se omite:', raw);
      omitidos++;
      continue;
    }

    const { email, nombre, cargaMaxima } = parsed.data;
    const yaExiste = await prisma.docente.findUnique({ where: { email } });

    if (!yaExiste) {
      await prisma.docente.create({ data: { email, nombre, cargaMaxima } });
      insertados++;
    } else {
      omitidos++;
    }
  }

  return { insertados, omitidos };
}

/**
 * Inserta disponibilidad horaria, evitando duplicados por docenteId + día + bloque.
 */
export async function insertarDisponibilidad(disponibilidades: DisponibilidadExcel[]) {
  let insertados = 0;
  let omitidos = 0;

  for (const raw of disponibilidades) {
    const parsed = disponibilidadSchema.safeParse(raw);

    if (!parsed.success) {
      console.warn('Disponibilidad inválida, se omite:', raw);
      omitidos++;
      continue;
    }

    const { docenteEmail, dia, bloque } = parsed.data;
    const docente = await prisma.docente.findUnique({ where: { email: docenteEmail } });

    if (!docente) {
      console.warn('Docente no encontrado para disponibilidad:', docenteEmail);
      omitidos++;
      continue;
    }

    const yaExiste = await prisma.disponibilidad.findFirst({
      where: { docenteId: docente.id, dia, bloque },
    });

    if (!yaExiste) {
      await prisma.disponibilidad.create({
        data: { docenteId: docente.id, dia, bloque },
      });
      insertados++;
    } else {
      omitidos++;
    }
  }

  return { insertados, omitidos };
}

/**
 * Inserta grupos por materia, evitando duplicados por materia + letra.
 */
export async function insertarGrupos(grupos: GrupoExcel[]) {
  let insertados = 0;
  let omitidos = 0;

  for (const raw of grupos) {
    const parsed = grupoSchema.safeParse(raw);

    if (!parsed.success) {
      console.warn('Grupo inválido, se omite:', raw);
      omitidos++;
      continue;
    }

    const { materia, letra } = parsed.data;

    // Búsqueda insensible a mayúsculas/minúsculas
    const materiaEntity = await prisma.materia.findFirst({
      where: {
        nombre: {
          equals: materia.trim(),
          mode: 'insensitive',
        },
      },
    });

    if (!materiaEntity) {
      console.warn('Materia no encontrada para grupo:', materia);
      omitidos++;
      continue;
    }

    const yaExiste = await prisma.grupo.findFirst({
      where: { letra, materiaId: materiaEntity.id },
    });

    if (!yaExiste) {
      await prisma.grupo.create({
        data: { letra, materiaId: materiaEntity.id },
      });
      insertados++;
    } else {
      omitidos++;
    }
  }

  return { insertados, omitidos };
}