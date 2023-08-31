// Count documents in a collection

import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string
const uri = "<connection string uri>";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("sample_mflix");
    const movies = database.collection("movies");

    /* Print the estimate of the number of documents in the
    "movies" collection */
    const estimate = await movies.estimatedDocumentCount();
    console.log(`Estimated number of documents in the movies collection: ${estimate}`);

    /* Print the number of documents in the "movies" collection that
    match the specified query */
    const query = { countries: "Canada" };
    const countCanada = await movies.countDocuments(query);
    console.log(`Number of movies from Canada: ${countCanada}`);
  } finally {
    // Close the connection after the operations complete
    await client.close();
  }
}
// Run the program and print any thrown exceptions
run().catch(console.dir);
