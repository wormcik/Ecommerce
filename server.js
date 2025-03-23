import express from 'express';
import cors from 'cors';
import { connectDB } from './connect.js';  // Correct import
import routes from './routes.js';  // Assuming routes.js is in the same folder
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS (Required for Vercel)
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/api', routes);
app.use(express.static('public')); // ✅ Serve public folder

// Connect to MongoDB before starting the server
(async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`🚀 Server running at: http://127.0.0.1:${port}`);
  });
})();
