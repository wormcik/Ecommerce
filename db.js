const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI;
if (!uri) {
  throw new Error("⛔ MONGO_URI environment variable is missing!");
}

let client;
let database;

async function connectDB() {
  if (!client) {
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // ✅ Prevents long delays in case of connection issues
    });

    try {
      await client.connect();
      console.log('✅ MongoDB bağlantısı başarılı!');
      database = client.db('ecommerce'); // ✅ Name of your database
    } catch (error) {
      console.error('❌ MongoDB bağlantı hatası:', error);
      process.exit(1); // ✅ Stops execution if connection fails
    }
  }
  return database;
}

function getDB() {
  if (!database) throw new Error('⛔ Veritabanı bağlantısı kurulamadı!');
  return database;
}

module.exports = { connectDB, getDB };
