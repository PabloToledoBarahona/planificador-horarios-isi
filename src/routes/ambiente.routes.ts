import { Router } from 'express';
import {
  listarAmbientes,
  registrarAmbiente,
  editarAmbiente,
  borrarAmbiente,
} from '../controllers/ambiente.controller';

const router = Router();

router.get('/', listarAmbientes);
router.post('/', registrarAmbiente);
router.put('/:id', editarAmbiente);
router.delete('/:id', borrarAmbiente);

export default router;