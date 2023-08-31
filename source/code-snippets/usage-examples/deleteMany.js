// Delete multiple documents

// Import the MongoClient type from the mongodb package.
import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "<connection string uri>";

// Create a new client and connect to MongoDB.
const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("sample_mflix");
    const movies = database.collection("movies");

    /* Delete all documents that match the specified regular
    expression in the title field from the "movies" collection */
    const query = { title: { $regex: "Santa" } };
    const result = await movies.deleteMany(query);

    // Print the number of deleted documents
    console.log("Deleted " + result.deletedCount + " documents");
  } finally {
    // Close the client after the operation completes
    await client.close();
  }
}
// Run the program and print any thrown exceptions
run().catch(console.dir);
