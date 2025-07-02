import { loginController } from '@controllers/auth.controller';
import { validateLogin } from '@validations/auth.validation';
import { Router } from 'express';


const router = Router();

router.post('/login', validateLogin, loginController);

export default router;