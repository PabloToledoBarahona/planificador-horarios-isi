import { importarExcelController } from '@controllers/importExcel.controller';
import { uploadExcel } from '@middlewares/multer.middleware';
import { Router } from 'express';


const router = Router();

router.post('/importar', uploadExcel.single('file'), importarExcelController);

export default router;