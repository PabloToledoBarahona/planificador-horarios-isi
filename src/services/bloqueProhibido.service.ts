import { prisma } from '@prisma/db';
import { bloqueProhibidoSchema } from '@validations/bloqueProhibido.validation';

export const BloqueProhibidoService = {
  async listarPorDocente(docenteId: number) {
    return prisma.bloqueProhibido.findMany({
      where: { docenteId },
      orderBy: [{ dia: 'asc' }, { bloque: 'asc' }],
    });
  },

  async crear(data: unknown) {
    const parsed = bloqueProhibidoSchema.safeParse(data);
    if (!parsed.success) throw new Error('Datos inválidos');

    const { docenteId, dia, bloque } = parsed.data;

    const yaExiste = await prisma.bloqueProhibido.findFirst({
      where: { docenteId, dia, bloque },
    });

    if (yaExiste) throw new Error('Bloque ya registrado como prohibido');

    return prisma.bloqueProhibido.create({ data: parsed.data });
  },

  async eliminar(id: number) {
    const existe = await prisma.bloqueProhibido.findUnique({ where: { id } });
    if (!existe) throw new Error('Registro no encontrado');

    return prisma.bloqueProhibido.delete({ where: { id } });
  },
};