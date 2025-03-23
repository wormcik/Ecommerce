import express from 'express';
import cors from 'cors';
import { connectDB } from './connect.js';  
import routes from './routes.js';  
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/api', routes);

// MongoDB bağlantısını kur ve server'ı başlat
(async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`🚀 Server running at: http://127.0.0.1:${port}`);
  });
})();
