import { Request, Response } from 'express';
import { AuthService } from '@services/auth.service';
import { AuthService as OtpService } from '@services/otp.service';

export const loginController = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const { token, nombre } = await AuthService.login(email, password);
    res.json({ token, nombre });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};

export const changePasswordController = async (req: Request, res: Response): Promise<void> => {
  const { password_actual, nuevo_password } = req.body;
  const userId = req.user?.userId;

  if (!userId) {
    res.status(401).json({ message: 'Usuario no autenticado' });
    return;
  }

  try {
    await AuthService.changePassword(userId, password_actual, nuevo_password);
    res.status(200).json({ message: 'Contraseña actualizada correctamente' });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const requestOtpController = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;
  try {
    await OtpService.sendOtpToEmail(email);
    res.status(200).json({ message: 'OTP enviado al correo institucional' });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const verifyOtpController = async (req: Request, res: Response): Promise<void> => {
  const { email, otp, newPassword } = req.body;
  try {
    await OtpService.verifyOtpAndResetPassword(email, otp, newPassword);
    res.status(200).json({ message: 'Contraseña actualizada correctamente' });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};