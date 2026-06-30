import { MongoClient, ServerApiVersion } from 'mongodb';
import dns from "node:dns"

dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

export const collections = {
    PRODUCT: "products",
    ORDER: "order",
    HERO_BANNER: "hero_banner",
    SALE_COUNTDOWN: "sale_countdown",
    REVIEW: "reviews"
};

if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

export const dbConnect = async (collectionName) => {
    try {
        const db = client.db(dbName);
        return db.collection(collectionName);
    } catch (e) {
        console.log(e);
    }
};
