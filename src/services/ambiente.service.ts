import { prisma } from '@prisma/db';
import { ambienteSchema } from '@validations/ambiente.schema';

export const AmbienteService = {
  async obtenerTodos() {
    return prisma.ambiente.findMany({ orderBy: { nombre: 'asc' } });
  },

  async obtenerPorId(id: number) {
    return prisma.ambiente.findUnique({ where: { id } });
  },

  async crear(data: unknown) {
    const parsed = ambienteSchema.safeParse(data);
    if (!parsed.success) {
      throw new Error('Datos inválidos para crear ambiente');
    }

    const { nombre, tipo, capacidad } = parsed.data;

    const yaExiste = await prisma.ambiente.findUnique({ where: { nombre } });
    if (yaExiste) {
      throw new Error('Ya existe un ambiente con ese nombre');
    }

    return prisma.ambiente.create({ data: { nombre, tipo, capacidad } });
  },

  async actualizar(id: number, data: unknown) {
    const parsed = ambienteSchema.safeParse(data);
    if (!parsed.success) {
      throw new Error('Datos inválidos para actualizar ambiente');
    }

    const { nombre, tipo, capacidad } = parsed.data;

    const ambienteExistente = await prisma.ambiente.findUnique({ where: { id } });
    if (!ambienteExistente) {
      throw new Error('Ambiente no encontrado');
    }

    const mismoNombre = await prisma.ambiente.findFirst({
      where: { nombre, NOT: { id } },
    });

    if (mismoNombre) {
      throw new Error('Otro ambiente ya tiene ese nombre');
    }

    return prisma.ambiente.update({
      where: { id },
      data: { nombre, tipo, capacidad },
    });
  },

  async eliminar(id: number) {
    const usado = await prisma.asignacion.findFirst({ where: { ambienteId: id } });

    if (usado) {
      throw new Error('No se puede eliminar: el ambiente está en uso por al menos una asignación');
    }

    return prisma.ambiente.delete({ where: { id } });
  },
};