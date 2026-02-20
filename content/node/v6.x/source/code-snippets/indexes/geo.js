// Create a geospatial index

const { MongoClient } = require("mongodb");

// Replace the placeholders with your MongoDB deployment's credentials
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?writeConcern=majority";

const client = new MongoClient(uri);

async function run() {
  try {
    // begin-idx
    const database = client.db("sample_mflix");
    const movies = database.collection("movies");

    /* Create a 2dsphere index on the "location.geo" field in the
    "movies" collection */
    const result = await movies.createIndex({ "location.geo": "2dsphere" });
    
    // Print the result of the index creation
    console.log(`Index created: ${result}`);
    // end-idx
  } finally {
    // Close the connection after the operation completes
    await client.close();
  }
}
// Run the program and print thrown errors
run().catch(console.dir);
