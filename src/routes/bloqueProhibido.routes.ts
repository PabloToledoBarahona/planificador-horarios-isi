import { Router } from 'express';
import {
  listarBloquesProhibidos,
  crearBloqueProhibido,
  eliminarBloqueProhibido,
  eliminarBloquesMasivos,
} from '@controllers/bloqueProhibido.controller';

const router = Router();

router.get('/:docenteId', listarBloquesProhibidos);
router.post('/', crearBloqueProhibido);
router.delete('/:id', eliminarBloqueProhibido);
router.delete('/', eliminarBloquesMasivos);

export default router;