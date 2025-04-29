const { MongoClient } = require("mongodb");

// Replace the following with your MongoDB deployment's connection string
const uri =
  "mongodb+srv://<clusterUrl>/?replicaSet=rs&writeConcern=majority";

const client = new MongoClient(uri);

// Replace <event name> with the name of the event you are subscribing to
const eventName = "<event name>";

// Subscribes to the event
client.on(eventName, (event) =>
  console.log("\nreceived event:\n", event)
);

async function run() {
  try {
    // Establishes and verifies connection
    await client.db("admin").command({ ping: 1 });
    console.log("\nConnected successfully!\n");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
