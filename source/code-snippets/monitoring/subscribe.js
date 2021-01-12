const { MongoClient } = require("mongodb");

// Replace the following with your MongoDB deployment's connection
// string.
const uri =
  "mongodb+srv://<clusterUrl>/?replicaSet=rs&writeConcern=majority";

const client = new MongoClient(uri);

// Replace <event name> with the name of the event you are subscribing to.
const eventName = "<event name>";
client.on(eventName, event => {
  console.log(`received ${eventName}: ${JSON.stringify(event, null, 2)}`);
});

async function run() {
  try {
    await client.connect();

    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
