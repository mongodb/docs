import "dotenv/config";
import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI || "";
const client = new MongoClient(uri);

try {
  // Connects the client to the server
  await client.connect();
  // Sends a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log(
    "Pinged your deployment. You successfully connected to MongoDB!"
  );
} catch(err) {
  console.error(err);
}

const db: Db = client.db("sample_restaurants");

export default db;
