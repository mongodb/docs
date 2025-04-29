/* Subscribe to SDAM event */

const { MongoClient } = require("mongodb");

// Replace the following with your MongoDB deployment's connection string
const uri = "mongodb+srv://<clusterUrl>/?replicaSet=rs&writeConcern=majority";

const client = new MongoClient(uri);

// Replace <event name> with the name of the event you are subscribing to
const eventName = "<event name>";

// Subscribes to a specified event and prints a message when the event is received
client.on(eventName, event => {
  console.log(`received ${eventName}: ${JSON.stringify(event, null, 2)}`);
});

async function run() {
  try {
    // Establishes and verifies connection to the database
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully");
  } finally {
    // Closes the database connection on completion or error
    await client.close();
  }
}
run().catch(console.dir);
