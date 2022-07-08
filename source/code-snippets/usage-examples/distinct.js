import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "<connection string uri>";

const client = new MongoClient(uri);

async function run() {
  try {
    // define a database and collection on which to run the method
    const database = client.db("sample_mflix");
    const movies = database.collection("movies");

    // specify the document field
    const fieldName = "year";

    // specify an optional query document
    const query = { directors: "Barbra Streisand" };

    const distinctValues = await movies.distinct(fieldName, query);

    console.log(distinctValues);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
