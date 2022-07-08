const { MongoClient } = require("mongodb");

// Replace the following with your MongoDB deployment's connection
// string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?writeConcern=majority";

const client = new MongoClient(uri);

async function run() {
  try {
    // begin-idx
    const database = client.db("sample_mflix");
    const movies = database.collection("movies");

    // Create a 2dsphere index on the "location.geo" field in the "theaters" collection.
    const result = await movies.createIndex({ "location.geo": "2dsphere" });
    console.log(`Index created: ${result}`);
    // end-idx
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
