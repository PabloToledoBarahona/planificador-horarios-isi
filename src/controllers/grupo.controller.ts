import { RequestHandler } from 'express';
import {
  obtenerGrupos,
  crearGrupo,
  actualizarGrupo,
  eliminarGrupo,
  obtenerGrupoPorId,
} from '@services/grupo.service';

export const getGruposController: RequestHandler = async (_req, res) => {
  try {
    const grupos = await obtenerGrupos();
    res.status(200).json(grupos);
  } catch (error) {
    console.error('Error al obtener grupos:', error);
    res.status(500).json({ message: 'Error al obtener grupos' });
  }
};

export const getGrupoByIdController: RequestHandler = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: 'ID inválido' });
      return;
    }

    const grupo = await obtenerGrupoPorId(id);
    if (!grupo) {
      res.status(404).json({ message: 'Grupo no encontrado' });
      return;
    }

    res.status(200).json(grupo);
  } catch (error) {
    console.error('Error al obtener grupo por ID:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const postGrupoController: RequestHandler = async (req, res) => {
  try {
    const grupo = await crearGrupo(req.body);
    res.status(201).json(grupo);
  } catch (error: any) {
    res.status(400).json({ message: error.message || 'Datos inválidos' });
  }
};

export const putGrupoController: RequestHandler = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const grupo = await actualizarGrupo(id, req.body);
    res.status(200).json(grupo);
  } catch (error: any) {
    res.status(400).json({ message: error.message || 'No se pudo actualizar el grupo' });
  }
};

export const deleteGrupoController: RequestHandler = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const grupo = await eliminarGrupo(id);
    res.status(200).json({ message: 'Grupo eliminado correctamente', grupo });
  } catch (error: any) {
    res.status(400).json({ message: error.message || 'No se pudo eliminar el grupo' });
  }
};