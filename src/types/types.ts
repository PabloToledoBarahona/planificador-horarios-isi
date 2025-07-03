export interface DocenteExcel {
  nombre: string;
  email: string;
  cargaMaxima: number;
}

export interface DisponibilidadExcel {
  docenteEmail: string;
  dia: string;
  bloque: number;
}

export interface GrupoExcel {
  materia: string;
  letra: string;
}