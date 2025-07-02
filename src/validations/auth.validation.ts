import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ errors: result.error.errors });
    return;
  }
  return next();
};