import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from '@routes/auth.routes';
import protectedRoutes from '@routes/protected.routes';
import excelRoutes from '@routes/excel.routes';

dotenv.config();

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);
app.use('/api/excel', excelRoutes);


// Ruta raíz
app.get('/', (req, res) => {
  res.send('Planificador de horarios - Backend activo');
});

export default app;