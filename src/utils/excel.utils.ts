import * as XLSX from 'xlsx';
import {
  DocenteExcel,
  DisponibilidadExcel,
  GrupoExcel,
} from '../types/types';

function validarHeaders(sheet: XLSX.WorkSheet, expectedKeys: string[], sheetName: string) {
  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as string[][];
  const headers = rows[0]?.map(h => String(h).trim().toLowerCase());

  const missing = expectedKeys.filter(key => !headers?.includes(key.toLowerCase()));
  if (missing.length > 0) {
    throw new Error(`La hoja '${sheetName}' está incompleta. Faltan columnas: ${missing.join(', ')}`);
  }
}

// Normaliza y transforma fila a objeto Docente
function normalizarDocente(row: any): DocenteExcel | null {
  const cargaMaxima = Number(row.cargaMaxima ?? row.cargamaxima);
  if (!row.nombre || !row.email || isNaN(cargaMaxima)) return null;

  return {
    nombre: String(row.nombre).trim(),
    email: String(row.email).trim().toLowerCase(),
    cargaMaxima,
  };
}

// Normaliza y transforma fila a objeto Disponibilidad
function normalizarDisponibilidad(row: any): DisponibilidadExcel | null {
  if (!row.email || !row.dia || row.bloque === undefined) return null;

  return {
    docenteEmail: String(row.email).trim().toLowerCase(),
    dia: String(row.dia).trim().toLowerCase(),
    bloque: Number(row.bloque),
  };
}

// Normaliza y transforma fila a objeto Grupo
function normalizarGrupo(row: any): GrupoExcel | null {
  if (!row.materia || !row.letra) return null;

  return {
    materia: String(row.materia).trim(),
    letra: String(row.letra).trim().toUpperCase(),
  };
}

// Función principal
export function parseExcelFile(buffer: Buffer): {
  docentes: DocenteExcel[];
  disponibilidad: DisponibilidadExcel[];
  grupos: GrupoExcel[];
} {
  const workbook = XLSX.read(buffer, { type: 'buffer' });

  const docentesSheet = workbook.Sheets['Docentes'];
  const disponibilidadSheet = workbook.Sheets['Disponibilidad'];
  const gruposSheet = workbook.Sheets['Grupos'];

  if (!docentesSheet || !disponibilidadSheet || !gruposSheet) {
    throw new Error('El archivo Excel debe contener las hojas: Docentes, Disponibilidad y Grupos.');
  }

  // Validación de headers esperados
  validarHeaders(docentesSheet, ['nombre', 'email', 'cargaMaxima'], 'Docentes');
  validarHeaders(disponibilidadSheet, ['email', 'dia', 'bloque'], 'Disponibilidad');
  validarHeaders(gruposSheet, ['materia', 'letra'], 'Grupos');

  // Transformación y filtrado
  const docentes = XLSX.utils
    .sheet_to_json(docentesSheet)
    .map(normalizarDocente)
    .filter((d): d is DocenteExcel => d !== null);

  const disponibilidad = XLSX.utils
    .sheet_to_json(disponibilidadSheet)
    .map(normalizarDisponibilidad)
    .filter((d): d is DisponibilidadExcel => d !== null);

  const grupos = XLSX.utils
    .sheet_to_json(gruposSheet)
    .map(normalizarGrupo)
    .filter((g): g is GrupoExcel => g !== null);

  return { docentes, disponibilidad, grupos };
}