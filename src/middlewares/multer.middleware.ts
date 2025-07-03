import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Directorio para archivos temporales
const uploadDir = path.resolve(__dirname, '../../uploads');

// Crea el directorio si no existe
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuración del almacenamiento
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const timestamp = Date.now();
    const safeName = file.originalname.replace(/\s+/g, '_');
    cb(null, `${timestamp}-${safeName}`);
  },
});

// Middleware configurado
export const uploadExcel = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    const allowedMime = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    if (file.mimetype === allowedMime) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos con extensión .xlsx'));
    }
  },
});