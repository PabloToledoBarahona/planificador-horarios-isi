import { Request, Response } from 'express';
import {
  obtenerAmbientes,
  crearAmbiente,
  actualizarAmbiente,
  eliminarAmbiente,
} from '../services/ambiente.service';

export const listarAmbientes = async (_req: Request, res: Response) => {
  try {
    const ambientes = await obtenerAmbientes();
    res.status(200).json(ambientes);
  } catch (error) {
    console.error('Error al listar ambientes:', error);
    res.status(500).json({ message: 'Error al obtener ambientes' });
  }
};

export const registrarAmbiente = async (req: Request, res: Response) => {
  try {
    const ambiente = await crearAmbiente(req.body);
    res.status(201).json(ambiente);
  } catch (error: any) {
    console.error('Error al crear ambiente:', error);
    res.status(400).json({ message: error.message || 'Datos inválidos' });
  }
};

export const editarAmbiente = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const ambiente = await actualizarAmbiente(id, req.body);
    res.status(200).json(ambiente);
  } catch (error: any) {
    console.error('Error al actualizar ambiente:', error);
    res.status(400).json({ message: error.message || 'Datos inválidos' });
  }
};

export const borrarAmbiente = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const ambiente = await eliminarAmbiente(id);
    res.status(200).json({ message: 'Ambiente eliminado correctamente', ambiente });
  } catch (error: any) {
    console.error('Error al eliminar ambiente:', error);
    res.status(400).json({ message: error.message || 'No se pudo eliminar el ambiente' });
  }
};