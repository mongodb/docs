// Delete multiple documents

import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string
const uri = "<connection string uri>";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("sample_mflix");
    const movies = database.collection("movies");

    /* Delete all documents that match the specified regular
    expression in the title field from the "movies" collection */
    const result = await movies.deleteMany({ title: { $regex: "Santa" } });
    
    // Print the number of deleted documents
    console.log("Deleted " + result.deletedCount + " documents");
  } finally {
    // Close the connection after the operation completes
    await client.close();
  }
}
// Run the program and print any thrown exceptions
run().catch(console.dir);
