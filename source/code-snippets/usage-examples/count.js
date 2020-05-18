// ignored first line
const { MongoClient } = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?w=majority";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    const database = client.db("sample_mflix");
    const movies = database.collection("movies");

    // Estimate the total number of documents in the collection
    // and print out the count.
    const estimate = await movies.estimatedDocumentCount();
    console.log(`Estimated number of documents in the movies collection: ${estimate}`);

    // Query for movies from Canada.
    const query = { countries: "Canada" };

    // Find the number of documents that match the specified
    // query, (i.e. with "Canada" as a value in the "countries" field)
    // and print out the count.
    const countCanada = await movies.countDocuments(query);
    console.log(`Number of movies from Canada: ${countCanada}`);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
