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

/**
 * GET /api/docentes
 */
export async function getDocentesController(_req: Request, res: Response): Promise<void> {
  const docentes = await listarDocentes();
  res.status(200).json(docentes);
}

/**
 * GET /api/docentes/:id
 */
export async function getDocenteByIdController(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const docente = await obtenerDocente(id);
  if (!docente) {
    res.status(404).json({ message: 'Docente no encontrado' });
    return;
  }
  res.status(200).json(docente);
}

/**
 * POST /api/docentes
 */
export async function postDocenteController(req: Request, res: Response): Promise<void> {
  const parsed = docenteCreateSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ errors: parsed.error.format() });
    return;
  }

  const nuevo = await crearDocente(parsed.data);
  res.status(201).json(nuevo);
}

/**
 * PUT /api/docentes/:id
 */
export async function putDocenteController(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const parsed = docenteUpdateSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ errors: parsed.error.format() });
    return;
  }

  const actualizado = await actualizarDocente(id, parsed.data);
  if (!actualizado) {
    res.status(404).json({ message: 'Docente no encontrado' });
    return;
  }

  res.status(200).json(actualizado);
}

/**
 * DELETE /api/docentes/:id
 */
export async function deleteDocenteController(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const eliminado = await eliminarDocente(id);

  if (!eliminado) {
    res.status(400).json({
      message: 'No se puede eliminar el docente porque tiene asignaciones',
    });
    return;
  }

  res.status(200).json({ message: 'Docente eliminado correctamente' });
}