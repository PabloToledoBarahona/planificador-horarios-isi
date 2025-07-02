import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from '@routes/auth.routes';

dotenv.config();

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Planificador de horarios - Backend activo');
});

export default app;