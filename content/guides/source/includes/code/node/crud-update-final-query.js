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

    // update code goes here
    const filter = {};
    const updateDoc = {
      $mul: {
        radius: 1.60934,
      },
    };

    const result = await coll.updateMany(filter, updateDoc);

    // display the results of your operation
    console.log("Number of documents updated: " + result.modifiedCount);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
