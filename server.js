const express = require('express');
const cors = require('cors');
const { connectDB } = require('./db');
const routes = require('./routes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS (Required for Vercel)
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/api', routes);
app.use(express.static('public')); // Public klasörünü sun

// Connect to MongoDB before starting the server
(async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`🚀 Server running at: http://127.0.0.1:${port}`);
  });
})();
