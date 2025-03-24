import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

const uri = process.env.MONGO_URI;
if (!uri) {
    throw new Error("⛔ MONGO_URI environment variable is missing!");
}

let client;
let database;

export async function connectDB() {
    if (!client) {
        client = new MongoClient(uri, {
            serverSelectionTimeoutMS: 5000,
        });

        try {
            await client.connect();
            console.log('✅ Connected to MongoDB');
            database = client.db('ecommerce');
        } catch (error) {
            console.error('❌ MongoDB connection error:', error);
            return { error: "MongoDB connection failed!" };
        }
    }
    return database;
}
