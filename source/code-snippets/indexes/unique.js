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

    // Create an ascending unique index on the "theaterId" field in the
    // "theaters" collection.
    const result = await mflix
      .collection("theaters")
      .createIndex({ theaterId: 1 }, { unique: true });
    console.log("Index " + result + " created.");

    // end-ex
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
