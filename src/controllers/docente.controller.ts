import { Request, Response } from 'express';
import {
  crearDocente,
  eliminarDocente,
  listarDocentes,
  obtenerDocente,
  actualizarDocente,
} from '../services/docente.service';
import {
  docenteCreateSchema,
  docenteUpdateSchema,
} from '../validations/docente.validator';

export async function getDocentesController(_req: Request, res: Response) {
  const docentes = await listarDocentes();
  res.json(docentes);
}

export async function getDocenteByIdController(req: Request, res: Response) {
  const id = Number(req.params.id);
  const docente = await obtenerDocente(id);
  if (!docente) return res.status(404).json({ message: 'Docente no encontrado' });
  res.json(docente);
}

export async function postDocenteController(req: Request, res: Response) {
  const parsed = docenteCreateSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ errors: parsed.error.format() });
  }

  const nuevo = await crearDocente(parsed.data);
  res.status(201).json(nuevo);
}

export async function putDocenteController(req: Request, res: Response) {
  const id = Number(req.params.id);
  const parsed = docenteUpdateSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ errors: parsed.error.format() });
  }

  const actualizado = await actualizarDocente(id, parsed.data);
  if (!actualizado) return res.status(404).json({ message: 'Docente no encontrado' });
  res.json(actualizado);
}

export async function deleteDocenteController(req: Request, res: Response) {
  const id = Number(req.params.id);
  const eliminado = await eliminarDocente(id);
  if (!eliminado) {
    return res.status(400).json({
      message: 'No se puede eliminar el docente porque tiene asignaciones',
    });
  }
  res.json({ message: 'Docente eliminado correctamente' });
}