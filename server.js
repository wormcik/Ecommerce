const express = require('express');
const { connectDB } = require('./db');
const routes = require('./routes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use('/api', routes);
app.use(express.static('public')); // Public klasörünü sun

// Sunucuyu başlat
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Sunucu çalışıyor: http://127.0.0.1:${port}`);
  });
}).catch(err => {
  console.error('❌ MongoDB bağlantı hatası:', err);
});
