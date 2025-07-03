import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

export interface DecodedToken {
  userId: number;
  rol: string;
}

export const verifyToken: RequestHandler = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth?.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Token no proporcionado' });
    return;
  }

  try {
    const token = auth.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Token inválido o expirado' });
  }
};