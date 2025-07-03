import { prisma } from '@prisma/db';

export async function listarDocentes() {
  return prisma.docente.findMany({ include: { disponibilidad: true } });
}

export async function obtenerDocente(id: number) {
  return prisma.docente.findUnique({
    where: { id },
    include: { disponibilidad: true },
  });
}

export async function crearDocente(data: {
  nombre: string;
  email: string;
  cargaMaxima: number;
  disponibilidad: { dia: string; bloque: number }[];
}) {
  return prisma.docente.create({
    data: {
      nombre: data.nombre,
      email: data.email,
      cargaMaxima: data.cargaMaxima,
      disponibilidad: {
        create: data.disponibilidad,
      },
    },
  });
}

export async function actualizarDocente(id: number, data: {
  nombre: string;
  cargaMaxima: number;
  disponibilidad: { dia: string; bloque: number }[];
}) {
  const docente = await prisma.docente.findUnique({ where: { id } });
  if (!docente) return null;

  await prisma.disponibilidad.deleteMany({ where: { docenteId: id } });

  return prisma.docente.update({
    where: { id },
    data: {
      nombre: data.nombre,
      cargaMaxima: data.cargaMaxima,
      disponibilidad: {
        create: data.disponibilidad,
      },
    },
  });
}

export async function eliminarDocente(id: number) {
  const asignaciones = await prisma.asignacion.count({ where: { docenteId: id } });
  if (asignaciones > 0) return false;

  await prisma.disponibilidad.deleteMany({ where: { docenteId: id } });
  await prisma.docente.delete({ where: { id } });
  return true;
}