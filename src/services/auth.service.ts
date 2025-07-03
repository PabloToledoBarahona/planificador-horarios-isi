import { prisma } from '@prisma/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const AuthService = {
  async login(email: string, password: string): Promise<{ token: string; nombre: string }> {
    const user = await prisma.usuario.findUnique({ where: { email } });
    if (!user) throw new Error('Usuario no encontrado');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Contraseña incorrecta');

    const token = jwt.sign(
      { userId: user.id, rol: user.rol },
      process.env.JWT_SECRET!,
      { expiresIn: '2h' }
    );

    return { token, nombre: user.nombre };
  },

  async changePassword(userId: number, currentPassword: string, newPassword: string): Promise<void> {
    const user = await prisma.usuario.findUnique({ where: { id: userId } });
    if (!user) throw new Error('Usuario no encontrado');

    const isValid = await bcrypt.compare(currentPassword, user.password);
    if (!isValid) throw new Error('La contraseña actual es incorrecta');

    const hashed = await bcrypt.hash(newPassword, 10);
    await prisma.usuario.update({
      where: { id: userId },
      data: { password: hashed },
    });
  },
};