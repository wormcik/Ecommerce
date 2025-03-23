import { MongoClient } from 'mongodb';

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

export default async function handler(req, res) {
    const db = await connectDB();
    if (db.error) {
        return res.status(500).json({ error: db.error });
    }

    res.json({ message: "✅ Connected to MongoDB!" });
}
