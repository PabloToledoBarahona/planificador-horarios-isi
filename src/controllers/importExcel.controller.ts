import { RequestHandler } from 'express';
import path from 'path';
import fs from 'fs';
import {
  insertarDocentes,
  insertarDisponibilidad,
  insertarGrupos,
} from '../services/importExcel.service';
import { parseExcelFile } from '../utils/excel.utils';

export const importarExcelController = async (req: Request, res: Response): Promise<void> => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: 'No se ha subido ningún archivo' });
    }

    const filePath = path.resolve(file.path);
    const buffer = fs.readFileSync(filePath);

    const { docentes, disponibilidad, grupos } = parseExcelFile(buffer);

    const resumenDocentes = await insertarDocentes(docentes);
    const resumenDisponibilidad = await insertarDisponibilidad(disponibilidad);
    const resumenGrupos = await insertarGrupos(grupos);

    fs.unlinkSync(filePath);

    const tieneErrores =
      resumenDocentes.errores.length > 0 ||
      resumenDisponibilidad.errores.length > 0 ||
      resumenGrupos.errores.length > 0;

    return res.status(200).json({
      message: tieneErrores
        ? 'Importación completada con advertencias'
        : 'Importación completada correctamente',
      resumen: {
        docentes: resumenDocentes,
        disponibilidad: resumenDisponibilidad,
        grupos: resumenGrupos,
      },
    });
  } catch (error) {
    console.error('Error al importar datos desde Excel:', error);
    return res.status(500).json({ message: 'Error al importar datos desde Excel' });
  }
};