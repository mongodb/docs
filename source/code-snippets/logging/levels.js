// begin-ex
const { MongoClient, Logger } = require("mongodb");

// Replace the following with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://<clusterUrl>/?replicaSet=rs&writeConcern=majority";

const client = new MongoClient(uri);

async function main(client) {
  // Set debug level
  Logger.setLevel("debug");

  const db = client.db("sample_mflix");

  // Run a sample command to produce logger messages
  await db.command({ isMaster: true });
}
// end-ex


async function run() {
  try {
    await client.connect();

    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");

    // Run our sample function
    await main(client);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
