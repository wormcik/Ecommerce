import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import router from './api/routes.js'; // Import routes

const app = express();

// Get directory name in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api', router);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Catch-all route to serve frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
