import { Router } from 'express';
import {
  getDocentesController,
  getDocenteByIdController,
  postDocenteController,
  putDocenteController,
  deleteDocenteController,
} from '../controllers/docente.controller';

const router = Router();

router.get('/', getDocentesController);
router.get('/:id', getDocenteByIdController);
router.post('/', postDocenteController);
router.put('/:id', putDocenteController);
router.delete('/:id', deleteDocenteController);

export default router;