import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from '@routes/auth.routes';
import protectedRoutes from '@routes/protected.routes';
import excelRoutes from '@routes/excel.routes';
import ambienteRoutes from '@routes/ambiente.routes';
import docenteRoutes from '@routes/docente.routes';

dotenv.config();

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);
app.use('/api/excel', excelRoutes);
app.use('/api/ambientes', ambienteRoutes);
app.use('/api/docentes', docenteRoutes);

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Planificador de horarios - Backend activo');
});

export default app;