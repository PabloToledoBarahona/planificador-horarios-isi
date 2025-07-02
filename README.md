# Planificador de Horarios ISI - Backend

Backend del sistema de generación inteligente de horarios académicos para la carrera de Ingeniería de Sistemas Informáticos en UNIVALLE. Utiliza Node.js con Express, TypeScript, Prisma y PostgreSQL.

## Características principales

- Autenticación con JWT
- Carga de datos institucionales desde Excel
- Configuración de restricciones duras y blandas
- Generación de horarios con algoritmo genético
- Exportación a PDF y Excel
- Arquitectura modular, limpia y escalable

## Tecnologías

- Node.js + Express
- TypeScript
- PostgreSQL
- Prisma ORM
- Dotenv, Cors, Zod, JWT, etc.

## Estructura del proyecto

```
/src
├── config/           # Configuraciones generales y Prisma
├── controllers/      # Controladores de rutas
├── middlewares/      # Middlewares personalizados
├── models/           # Modelos de dominio (si aplica)
├── routes/           # Rutas de Express
├── services/         # Lógica de negocio
├── validations/      # Validaciones con Zod
├── utils/            # Funciones utilitarias
├── constants/        # Enumeraciones y valores constantes
├── prisma/           # Cliente de Prisma
├── app.ts            # Configuración de Express
└── index.ts          # Punto de entrada
```

## Scripts

```bash
npm run dev     # Ejecuta el servidor en modo desarrollo (ts-node-dev)
