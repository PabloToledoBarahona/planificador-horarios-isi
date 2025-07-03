import { z } from 'zod';

export const ambienteSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido'),
  tipo: z.enum(['teorica', 'practica'], {
    errorMap: () => ({ message: 'El tipo debe ser "teorica" o "practica"' }),
  }),
  capacidad: z.number().int().positive('La capacidad debe ser un número positivo'),
});