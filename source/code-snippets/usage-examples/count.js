// ignored first line
const { MongoClient } = require("mongodb");

// Replace the following string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();

    const database = client.db("sample_mflix");
    const collection = database.collection("movies");

    // Estimate the total number of documents in the collection
    // and print out the count.
    var estimate = await collection.estimatedDocumentCount();
    console.log(
      "Estimated number of documents in the movies collection: " + estimate,
    );

    // Query for movies from Canada.
    const query = { countries: "Canada" };

    // Find the number of documents that match the specified
    // query, (i.e. with "Canada" as a value in the "countries" field)
    // and print out the count.
    var countCanada = await collection.countDocuments(query);
    console.log("Number of movies from Canada: " + countCanada);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
