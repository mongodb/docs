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

    // create an array of documents to insert
    const docs = [
      { name: "Red", town: "Kanto" },
      { name: "Blue", town: "Kanto" },
      { name: "Leon", town: "Galar" }
    ];

    // this option prevents additional documents from being inserted if one fails
    const options = { ordered: true };

    const result = await collection.insertMany(docs, options);
    console.log(`${result.insertedCount} documents were inserted`);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
