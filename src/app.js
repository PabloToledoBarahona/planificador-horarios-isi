require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas base (luego se modularizan)
app.get('/', (req, res) => {
  res.send('Planificador de horarios - Backend activo');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});