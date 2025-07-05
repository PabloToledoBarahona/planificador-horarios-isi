import { RequestHandler } from 'express';
import { BloqueProhibidoService } from '@services/bloqueProhibido.service';
import { prisma } from '@prisma/db';

export const listarBloquesProhibidos: RequestHandler = async (req, res) => {
  try {
    const docenteId = Number(req.params.docenteId);
    const lista = await BloqueProhibidoService.listarPorDocente(docenteId);
    res.json(lista);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const crearBloqueProhibido: RequestHandler = async (req, res) => {
  try {
    const nuevo = await BloqueProhibidoService.crear(req.body);
    res.status(201).json(nuevo);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const eliminarBloqueProhibido: RequestHandler = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const eliminado = await BloqueProhibidoService.eliminar(id);
    res.json(eliminado);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const eliminarBloquesMasivos: RequestHandler = async (req, res) => {
  try {
    const ids = req.body.ids as number[];
    if (!Array.isArray(ids) || ids.some(id => typeof id !== 'number')) {
      res.status(400).json({ message: 'IDs inválidos' });
      return;
    }

    const eliminados = await prisma.bloqueProhibido.deleteMany({
      where: { id: { in: ids } },
    });

    res.json({ eliminados: eliminados.count });
  } catch (error: any) {
    console.error('Error al eliminar múltiples bloques:', error);
    res.status(500).json({ message: error.message });
  }
};