const { MongoClient } = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&writeConcern=majority";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    // database and collection code goes here
    const db = client.db("sample_guides");
    const coll = db.collection("comets");

    // delete code goes here
    const doc = {
      OrbitalPeriod: {
        $gt: 5,
        $lt: 85
      }
    };

    const result = await coll.deleteMany(doc);

    // amount deleted code goes here
    console.log("Number of documents deleted: " + result.deletedCount);

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
