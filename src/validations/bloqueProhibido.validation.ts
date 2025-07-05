import { z } from 'zod';

export const bloqueProhibidoSchema = z.object({
  dia: z.enum(['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'], {
    errorMap: () => ({ message: 'Día inválido' }),
  }),
  bloque: z.number().int().min(1).max(7),
  docenteId: z.number().int().positive(),
});