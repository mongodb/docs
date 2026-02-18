import { MongoClient, type Db } from "mongodb";

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase(){
    if (cachedClient && cachedDb){
        return { client: cachedClient, db: cachedDb };
    }


const config = useRuntimeConfig();
const uri = config.mongoURI;

if (!uri){
    throw new Error("Please define the MONGO_URI environment variable inside .env");
}

const client = new MongoClient(uri);
await client.connect();

const db = client.db("sample_restaurants");
cachedClient = client;
cachedDb = db;

console.log("Connected to MongoDB Atlas");

return { client, db };
}