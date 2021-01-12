const { MongoClient } = require("mongodb");

// Replace the following with your MongoDB deployment's connection
// string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?writeConcern=majority";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    // begin-idx
    const db = client.db("sample_mflix");
    const movies = db.collection("movies");

    // Create a unique index on the "theaterId" field in the "theaters" collection.
    const result = await movies.createIndex({ theaterId: 1 }, { unique: true });
    console.log(`Index created: ${result}`);
    // end-idx
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
