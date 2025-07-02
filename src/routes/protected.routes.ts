import { Router, Request, Response } from 'express';
import { verifyToken } from '@middlewares/auth.middleware';

const router = Router();

router.get('/test', verifyToken, (req: Request, res: Response) => {
  const user = (req as any).user;
  res.json({ message: 'Acceso concedido', user });
});

export default router;