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
    const collection = database.collection("movies");

    // create a set of documents
    const docOne = { name: "Red", town: "Kanto" };
    const docTwo = { name: "Blue", town: "Kanto" };
    const docThree = { name: "Leon", town: "Galar" };
    // create a docs array and add the documents to the array
    const docs = [docOne, docTwo, docThree];
    // specify an additional options object
    const options = {};
    options.ordered = true; // prevent additional documents from being inserted if one fails
    const result = await collection.insertMany(docs, options);
    console.log(`${result.insertedCount} documents were inserted`);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
