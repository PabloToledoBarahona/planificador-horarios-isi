import { Request, Response } from 'express';
import {
  obtenerGrupos,
  crearGrupo,
  actualizarGrupo,
  eliminarGrupo,
  obtenerGrupoPorId,
} from '@services/grupo.service';

export const getGruposController = async (_req: Request, res: Response) => {
  try {
    const grupos = await obtenerGrupos();
    res.json(grupos);
  } catch (error) {
    console.error('Error al obtener grupos:', error);
    res.status(500).json({ message: 'Error al obtener grupos' });
  }
};

export const getGrupoByIdController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    const grupo = await obtenerGrupoPorId(id);
    if (!grupo) {
      return res.status(404).json({ message: 'Grupo no encontrado' });
    }

    res.status(200).json(grupo);
  } catch (error) {
    console.error('Error al obtener grupo por ID:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const postGrupoController = async (req: Request, res: Response) => {
  try {
    const grupo = await crearGrupo(req.body);
    res.status(201).json(grupo);
  } catch (error: any) {
    res.status(400).json({ message: error.message || 'Datos inválidos' });
  }
};

export const putGrupoController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const grupo = await actualizarGrupo(id, req.body);
    res.status(200).json(grupo);
  } catch (error: any) {
    res.status(400).json({ message: error.message || 'No se pudo actualizar el grupo' });
  }
};

export const deleteGrupoController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const grupo = await eliminarGrupo(id);
    res.json({ message: 'Grupo eliminado correctamente', grupo });
  } catch (error: any) {
    res.status(400).json({ message: error.message || 'No se pudo eliminar el grupo' });
  }
};