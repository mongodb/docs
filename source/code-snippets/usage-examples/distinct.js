import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "<connection string uri>";

const client = new MongoClient(uri);

async function run() {
  try {
    
    // Get the database and collection on which to run the operation
    const database = client.db("sample_mflix");
    const movies = database.collection("movies");

    // Specify the document field to find distinct values for
    const fieldName = "year";

    // Specify an optional query document to narrow results
    const query = { directors: "Barbra Streisand" };

    // Execute the distinct operation
    const distinctValues = await movies.distinct(fieldName, query);

    // Print the result
    console.log(distinctValues);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
