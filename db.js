const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

let database;

async function connectDB() {
  await client.connect();
  console.log('✅ MongoDB bağlantısı başarılı!');
  database = client.db('ecommerce'); // Kullanılacak veritabanı
}

function getDB() {
  if (!database) throw new Error('⛔ Veritabanı bağlantısı kurulamadı!');
  return database;
}

module.exports = { connectDB, getDB };
