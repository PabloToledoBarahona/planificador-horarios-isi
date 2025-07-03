import { Router } from 'express';
import {
  listarAmbientes,
  registrarAmbiente,
  editarAmbiente,
  borrarAmbiente,
  getAmbienteByIdController,
} from '../controllers/ambiente.controller';

const router = Router();

router.get('/', listarAmbientes);
router.get('/:id', getAmbienteByIdController); 
router.post('/', registrarAmbiente);
router.put('/:id', editarAmbiente);
router.delete('/:id', borrarAmbiente);

export default router;