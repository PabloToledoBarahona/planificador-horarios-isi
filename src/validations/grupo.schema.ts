import { z } from 'zod';

export const grupoSchema = z.object({
  materiaId: z.number().int().positive('El ID de materia debe ser un número positivo'),
  letra: z.string().min(1).max(2, 'Máximo 2 caracteres').toUpperCase(),
});