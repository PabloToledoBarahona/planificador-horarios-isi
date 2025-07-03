import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from '@routes/auth.routes';
import protectedRoutes from '@routes/protected.routes';
import excelRoutes from '@routes/excel.routes';
import ambienteRoutes from '@routes/ambiente.routes';
import docenteRoutes from '@routes/docente.routes';
import grupoRoutes from '@routes/grupo.routes';
import { verifyToken } from '@middlewares/auth.middleware';

dotenv.config();

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);

// Rutas protegidas
app.use('/api/protected', verifyToken, protectedRoutes);
app.use('/api/excel', verifyToken, excelRoutes);
app.use('/api/ambientes', verifyToken, ambienteRoutes);
app.use('/api/docentes', verifyToken, docenteRoutes);
app.use('/api/grupos', verifyToken, grupoRoutes);

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Planificador de horarios - Backend activo');
});

export default app;