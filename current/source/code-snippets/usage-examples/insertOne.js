import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "<connection string uri>";

// Create a new client and connect to MongoDB
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect to the "sample_mflix" database and access its "movies" collection
    const database = client.db("sample_mflix");
    const movies = database.collection("movies");
    
    // Create a document to insert
    const doc = {
      title: "Charade",
      genres: ["Comedy", "Romance", "Thriller"],
      year: 1963,
      cast: ["Cary Grant", "Audrey Hepburn", "Walter Matthau"],
    }
    // Insert the defined document into the "movies" collection
    const result = await movies.insertOne(doc);

    // Print the ID of the inserted document
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } finally {
     // Close the MongoDB client connection
    await client.close();
  }
}
// Run the function and handle any errors
run().catch(console.dir);
