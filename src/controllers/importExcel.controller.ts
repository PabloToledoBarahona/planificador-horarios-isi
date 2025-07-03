import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import {
  insertarDocentes,
  insertarDisponibilidad,
  insertarGrupos,
} from '../services/importExcel.service';
import { parseExcelFile } from '../utils/excel.utils';

export const importarExcelController = async (req: Request, res: Response) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No se ha subido ningún archivo' });
    }

    const filePath = path.resolve(file.path);
    const buffer = fs.readFileSync(filePath);

    // Parsear y validar estructura
    const { docentes, disponibilidad, grupos } = parseExcelFile(buffer);

    console.log('Docentes cargados:', docentes.length);
    console.log('Disponibilidad cargada:', disponibilidad.length);
    console.log('Grupos cargados:', grupos.length);

    // Procesamiento e inserción
    const resumenDocentes = await insertarDocentes(docentes);
    const resumenDisponibilidad = await insertarDisponibilidad(disponibilidad);
    const resumenGrupos = await insertarGrupos(grupos);

    // Limpiar archivo temporal
    fs.unlinkSync(filePath);

    // Resumen de la importación
    res.status(200).json({
      message: 'Importación completada correctamente',
      resumen: {
        docentes: resumenDocentes,
        disponibilidad: resumenDisponibilidad,
        grupos: resumenGrupos,
      },
    });
  } catch (error) {
    console.error('Error al importar datos desde Excel:', error);
    res.status(500).json({ message: 'Error al importar datos desde Excel' });
  }
};