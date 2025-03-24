import express from 'express';
import cors from 'cors';
import { connectDB } from './connect.js';  
import routes from './routes.js';  
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 3000;

// CORS Ayarları
app.use(cors({ origin: '*' }));
app.use(express.json());

// API Rotaları
app.use('/api', routes);

// Statik Dosya Servisi (Bunu en sona aldık)
//app.use(express.static('public'));

// Sunucuyu Başlat
(async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`🚀 Server running at: http://127.0.0.1:${port}`);
  });
})();
