const { MongoClient } = require("mongodb");

// Replace the following with your MongoDB deployment's connection
// string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?writeConcern=majority";

// Create a new client and connect to MongoDB
const client = new MongoClient(uri);

async function run() {
  try {
    // begin-idx
    // Connect to the "sample_mflix" database
    const database = client.db("sample_mflix");
    // Access the database's "movies" collection
    const movies = database.collection("movies");

    // Create an ascending index on the "type" and "genre" fields
    // in the "movies" collection.
    const result = await movies.createIndex({ type: 1, genre: 1 });
    console.log(`Index created: ${result}`);
    // end-idx

    // begin-query
    // Define a query to find movies in the "Drama" genre
    const query = { type: "movie", genre: "Drama" };
    // Define sorting criteria for the query results
    const sort = { type: 1, genre: 1 };
    // Include only the type and genre fields in the query results
    const projection = { _id: 0, type: 1, genre: 1 };

    // Execute the query using the defined criteria and projection
    const cursor = movies
      .find(query)
      .sort(sort)
      .project(projection);
    // end-query

  } finally {
    // Close the MongoDB client connection
    await client.close();
  }
}
// Run the function and handle any errors
run().catch(console.dir);
