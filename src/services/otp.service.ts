import { prisma } from '@prisma/db';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import path from 'path';
import fs from 'fs';
import handlebars from 'handlebars';
import { sendOtpEmail } from '@utils/email/sendOtpEmail';

// Generador de código OTP
function generateOtp(): string {
  return crypto.randomInt(100000, 999999).toString();
}

export const AuthService = {
  async sendOtpToEmail(email: string): Promise<void> {
    const otpCode = generateOtp();
    const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutos

    // Guardar en la base de datos
    await prisma.otp.create({
      data: {
        email,
        code: otpCode,
        expiresAt: expires,
      },
    });

    // Renderizar plantilla y enviar correo
    try {
      await sendOtpEmail(email, otpCode);
      console.log(`OTP enviado exitosamente a ${email}`);
    } catch (error) {
      console.error('Error enviando OTP con Nodemailer:', error);
      throw new Error('No se pudo enviar el código OTP al correo');
    }
  },

  async verifyOtpAndResetPassword(
    email: string,
    otp: string,
    newPassword: string
  ): Promise<void> {
    const record = await prisma.otp.findFirst({
      where: {
        email,
        code: otp,
        used: false,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!record) {
      throw new Error('OTP inválido o expirado');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.usuario.update({
      where: { email },
      data: { password: hashedPassword },
    });

    await prisma.otp.update({
      where: { id: record.id },
      data: { used: true },
    });
  },
};