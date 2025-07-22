// Create a multikey index

const { MongoClient } = require("mongodb");

// Replace the placeholders with your credentials
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?writeConcern=majority";

const client = new MongoClient(uri);

async function run() {
  try {
    // begin-idx
    const database = client.db("sample_mflix");
    const movies = database.collection("movies");

    // Create a multikey index on the "cast" field in the "movies" collection
    const result = await movies.createIndex({ cast: 1 });
    // end-idx

    // Print the result of creating the index
    console.log(`Index created: ${result}`);

    // begin-query
    const query = { cast: "Viola Davis" };
    const projection = { _id: 0, cast: 1 , title: 1 };

    // Perform a find operation with the preceding filter and projection
    const cursor = movies
      .find(query)
      .project(projection);
    // end-query

  } finally {
    // Close the connection after the operation completes
    await client.close();
  }
}
// Run the program and print any errors
run().catch(console.dir);
