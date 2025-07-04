import { prisma } from '@prisma/db';
import { DocenteExcel, DisponibilidadExcel, GrupoExcel } from '../types/types';
import {
  validarDocente,
  validarDisponibilidad,
  validarGrupo,
} from '../validations/importExcel.validation';
import { ResumenImportacion } from '../validations/importExcel.validation';

export async function insertarDocentes(docentes: DocenteExcel[]): Promise<ResumenImportacion> {
  let insertados = 0;
  let omitidos = 0;
  const errores: string[] = [];

  for (const raw of docentes) {
    const { valido, data, error } = validarDocente(raw);

    if (!valido || !data) {
      errores.push(`Docente inválido: ${error}`);
      omitidos++;
      continue;
    }

    const yaExiste = await prisma.docente.findUnique({ where: { email: data.email } });

    if (yaExiste) {
      errores.push(`Docente duplicado (email): ${data.email}`);
      omitidos++;
      continue;
    }

    await prisma.docente.create({ data });
    insertados++;
  }

  return { insertados, omitidos, errores };
}

export async function insertarDisponibilidad(disponibilidades: DisponibilidadExcel[]): Promise<ResumenImportacion> {
  let insertados = 0;
  let omitidos = 0;
  const errores: string[] = [];

  for (const raw of disponibilidades) {
    const { valido, data, error } = validarDisponibilidad(raw);

    if (!valido || !data) {
      errores.push(`Disponibilidad inválida: ${error}`);
      omitidos++;
      continue;
    }

    const docente = await prisma.docente.findUnique({ where: { email: data.docenteEmail } });
    if (!docente) {
      errores.push(`Docente inexistente para disponibilidad: ${data.docenteEmail}`);
      omitidos++;
      continue;
    }

    const yaExiste = await prisma.disponibilidad.findFirst({
      where: { docenteId: docente.id, dia: data.dia, bloque: data.bloque },
    });

    if (yaExiste) {
      errores.push(`Disponibilidad duplicada: ${data.docenteEmail} - ${data.dia} bloque ${data.bloque}`);
      omitidos++;
      continue;
    }

    await prisma.disponibilidad.create({
      data: { docenteId: docente.id, dia: data.dia, bloque: data.bloque },
    });

    insertados++;
  }

  return { insertados, omitidos, errores };
}

export async function insertarGrupos(grupos: GrupoExcel[]): Promise<ResumenImportacion> {
  let insertados = 0;
  let omitidos = 0;
  const errores: string[] = [];

  for (const raw of grupos) {
    const { valido, data, error } = validarGrupo(raw);

    if (!valido || !data) {
      errores.push(`Grupo inválido: ${error}`);
      omitidos++;
      continue;
    }

    const materia = await prisma.materia.findFirst({
      where: {
        nombre: { equals: data.materia.trim(), mode: 'insensitive' },
      },
    });

    if (!materia) {
      errores.push(`Materia inexistente: ${data.materia}`);
      omitidos++;
      continue;
    }

    const yaExiste = await prisma.grupo.findFirst({
      where: { materiaId: materia.id, letra: data.letra },
    });

    if (yaExiste) {
      errores.push(`Grupo duplicado: ${data.materia} - ${data.letra}`);
      omitidos++;
      continue;
    }

    await prisma.grupo.create({
      data: { letra: data.letra, materiaId: materia.id },
    });

    insertados++;
  }

  return { insertados, omitidos, errores };
}