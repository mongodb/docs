import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "<connection string uri>";

const client = new MongoClient(uri);

interface Food {
  name: string;
  healthy: boolean;
}

async function run() {
  try {
    const database = client.db("insertDB");
    // Specifying a schema is optional, but it enables type hints on
    // finds and inserts
    const foods = database.collection<Food>("foods");

    const result = await foods.insertMany(
      [
        { name: "cake", healthy: false },
        { name: "lettuce", healthy: true },
        { name: "donut", healthy: false },
      ],
      { ordered: true }
    );
    console.log(`${result.insertedCount} documents were inserted`);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
