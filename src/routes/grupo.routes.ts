import { Router } from 'express';
import {
  getGruposController,
  postGrupoController,
  putGrupoController,
  deleteGrupoController,
  getGrupoByIdController,
} from '@controllers/grupo.controller';

const router = Router();

router.get('/', getGruposController);
router.get('/:id', getGrupoByIdController);
router.post('/', postGrupoController);
router.put('/:id', putGrupoController);
router.delete('/:id', deleteGrupoController);

export default router;