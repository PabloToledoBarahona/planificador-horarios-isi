import { Router } from 'express';
import {
  changePasswordController,
  loginController,
  requestOtpController,
  verifyOtpController,
} from '@controllers/auth.controller';
import { verifyToken } from '@middlewares/auth.middleware';
import {
  validateLogin,
  validatePasswordChange,
} from '@validations/auth.validation';

const router = Router();

router.post('/login', validateLogin, loginController);
router.patch('/change-password', verifyToken, validatePasswordChange, changePasswordController);
router.post('/request-otp', requestOtpController);
router.post('/verify-otp', verifyOtpController);

export default router;