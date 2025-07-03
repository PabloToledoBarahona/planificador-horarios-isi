import { Request, Response } from 'express';
import { AmbienteService } from '@services/ambiente.service';

/**
 * GET /api/ambientes
 */
export const listarAmbientes = async (_req: Request, res: Response): Promise<void> => {
  try {
    const ambientes = await AmbienteService.obtenerTodos();
    res.status(200).json(ambientes);
  } catch (error) {
    console.error('Error al listar ambientes:', error);
    res.status(500).json({ message: 'Error al obtener ambientes' });
  }
};

/**
 * GET /api/ambientes/:id
 */
export const getAmbienteByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: 'ID inválido' });
      return;
    }

    const ambiente = await AmbienteService.obtenerPorId(id);
    if (!ambiente) {
      res.status(404).json({ message: 'Ambiente no encontrado' });
      return;
    }

    res.status(200).json(ambiente);
  } catch (error) {
    console.error('Error al obtener ambiente por ID:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

/**
 * POST /api/ambientes
 */
export const registrarAmbiente = async (req: Request, res: Response): Promise<void> => {
  try {
    const ambiente = await AmbienteService.crear(req.body);
    res.status(201).json(ambiente);
  } catch (error: any) {
    console.error('Error al crear ambiente:', error);
    res.status(400).json({ message: error.message || 'Datos inválidos' });
  }
};

/**
 * PUT /api/ambientes/:id
 */
export const editarAmbiente = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const ambiente = await AmbienteService.actualizar(id, req.body);
    res.status(200).json(ambiente);
  } catch (error: any) {
    console.error('Error al actualizar ambiente:', error);
    res.status(400).json({ message: error.message || 'Datos inválidos' });
  }
};

/**
 * DELETE /api/ambientes/:id
 */
export const borrarAmbiente = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const ambiente = await AmbienteService.eliminar(id);
    res.status(200).json({ message: 'Ambiente eliminado correctamente', ambiente });
  } catch (error: any) {
    console.error('Error al eliminar ambiente:', error);
    res.status(400).json({ message: error.message || 'No se pudo eliminar el ambiente' });
  }
};