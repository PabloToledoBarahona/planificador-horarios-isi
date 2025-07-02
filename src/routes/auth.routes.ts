import { loginController, verifyOtpController, requestOtpController } from '@controllers/auth.controller';
import { validateLogin } from '@validations/auth.validation';
import { Router } from 'express';


const router = Router();

router.post('/login', validateLogin, loginController);
router.post('/request-otp', requestOtpController);
router.post('/verify-otp', verifyOtpController);

export default router;