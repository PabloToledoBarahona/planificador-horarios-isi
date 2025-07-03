import { z } from 'zod';

export const disponibilidadSchema = z.object({
  dia: z.string().min(1),
  bloque: z.number().int().min(1).max(7),
});

export const docenteCreateSchema = z.object({
  nombre: z.string().min(1),
  email: z.string().email(),
  cargaMaxima: z.number().int().positive(),
  disponibilidad: z.array(disponibilidadSchema),
});

export const docenteUpdateSchema = z.object({
  nombre: z.string().min(1),
  cargaMaxima: z.number().int().positive(),
  disponibilidad: z.array(disponibilidadSchema),
});