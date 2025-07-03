import { prisma } from '@prisma/db';
import { grupoSchema } from '@validations/grupo.schema';

export async function obtenerGrupos() {
  return prisma.grupo.findMany({
    include: { materia: { select: { nombre: true } } },
    orderBy: [{ materia: { nombre: 'asc' } }, { letra: 'asc' }],
  });
}

export async function obtenerGrupoPorId(id: number) {
  return prisma.grupo.findUnique({
    where: { id },
    include: { materia: { select: { nombre: true } } },
  });
}

export async function crearGrupo(data: unknown) {
  const parsed = grupoSchema.safeParse(data);
  if (!parsed.success) throw new Error('Datos inválidos para grupo');

  const { materiaId, letra } = parsed.data;

  const existe = await prisma.grupo.findFirst({
    where: { materiaId, letra },
  });

  if (existe) throw new Error('Ya existe un grupo con esa letra para la materia');

  return prisma.grupo.create({ data: { materiaId, letra } });
}

export async function actualizarGrupo(id: number, data: unknown) {
  const parsed = grupoSchema.safeParse(data);
  if (!parsed.success) throw new Error('Datos inválidos para grupo');

  const { materiaId, letra } = parsed.data;

  const otroGrupo = await prisma.grupo.findFirst({
    where: {
      materiaId,
      letra,
      NOT: { id },
    },
  });

  if (otroGrupo) throw new Error('Otro grupo con esa letra ya existe para esta materia');

  return prisma.grupo.update({ where: { id }, data: { materiaId, letra } });
}

export async function eliminarGrupo(id: number) {
  const tieneAsignaciones = await prisma.asignacion.findFirst({
    where: { grupoId: id },
  });

  if (tieneAsignaciones) {
    throw new Error('No se puede eliminar: el grupo tiene asignaciones');
  }

  return prisma.grupo.delete({ where: { id } });
}