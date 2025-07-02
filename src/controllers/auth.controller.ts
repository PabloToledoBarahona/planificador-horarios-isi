import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { prisma } from '@prisma/client';

export const loginController = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await prisma.usuario.findUnique({ where: { email } });

    if (!user) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Contraseña incorrecta' });
      return;
    }

    const token = jwt.sign(
      { userId: user.id, rol: user.rol },
      process.env.JWT_SECRET!,
      { expiresIn: '2h' }
    );

    res.json({ token, nombre: user.nombre });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};