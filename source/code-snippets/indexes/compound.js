const { MongoClient } = require("mongodb");

// Replace the following with your MongoDB deployment's connection
// string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();

    // begin-ex
    //
    // (Connection code omitted for space.)
    //
    // Specify the "sample_mflix" database.
    const mflix = client.db("sample_mflix");

    // Create an ascending index on the "type" and "genre" fields
    // in the "movies" collection.
    const result = await mflix
      .collection("movies")
      .createIndex({ type: 1, genre: 1 });
    console.log("Index " + result + " created.");
    // end-example
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
