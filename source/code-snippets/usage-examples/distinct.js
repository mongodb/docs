// ignored first line
const { MongoClient } = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?w=majority";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    // define a database and collection on which to run the method
    const database = client.db("sample_mflix");
    const collection = database.collection("movies");

    // specify the document field
    const fieldName = "year";

    // specify an optional query document
    const query = { directors: "Barbra Streisand" };

    const distinctValues = await collection.distinct(fieldName, query);

    console.log(distinctValues);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
