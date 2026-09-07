import express from 'express';
import dotenv from 'dotenv';
import { conn } from './src/config/database.js';
import './src/models/modelUser.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API Admisiones UdeA activa' });
});

const startServer = async () => {
  try {
    await conn.authenticate();
    console.log('✅ Conexión con MySQL exitosa.');

    await conn.sync({ alter: true });
    console.log('✅ Tabla de Usuarios sincronizada.');

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
  }
};

startServer();