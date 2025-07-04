import { z } from 'zod';
import { DocenteExcel, DisponibilidadExcel, GrupoExcel } from '../types/types';

export interface ResumenImportacion {
  insertados: number;
  omitidos: number;
  errores: string[];
}

export const docenteSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido'),
  email: z.string().email('El email no es válido'),
  cargaMaxima: z.number().int().nonnegative('La carga debe ser positiva'),
});

export const disponibilidadSchema = z.object({
  docenteEmail: z.string().email('Email del docente inválido'),
  dia: z.string().min(1, 'El día es requerido'),
  bloque: z.number().int().min(1).max(7),
});

export const grupoSchema = z.object({
  materia: z.string().min(1, 'Materia es requerida'),
  letra: z.string().min(1, 'Letra del grupo requerida'),
});

export function validarDocente(d: any): { valido: boolean; data?: DocenteExcel; error?: string } {
  const result = docenteSchema.safeParse(d);
  if (result.success) return { valido: true, data: result.data };
  return { valido: false, error: result.error.errors.map(e => e.message).join(', ') };
}

export function validarDisponibilidad(d: any): { valido: boolean; data?: DisponibilidadExcel; error?: string } {
  const result = disponibilidadSchema.safeParse(d);
  if (result.success) return { valido: true, data: result.data };
  return { valido: false, error: result.error.errors.map(e => e.message).join(', ') };
}

export function validarGrupo(g: any): { valido: boolean; data?: GrupoExcel; error?: string } {
  const result = grupoSchema.safeParse(g);
  if (result.success) return { valido: true, data: result.data };
  return { valido: false, error: result.error.errors.map(e => e.message).join(', ') };
}