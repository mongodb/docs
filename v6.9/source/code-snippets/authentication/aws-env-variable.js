const { MongoClient } = require("mongodb");

// Remember to specify your AWS credentials in environment variables.
const clusterUrl = "<MongoDB deployment url>";
const authMechanism = "MONGODB-AWS";

let uri =
  `mongodb+srv://${clusterUrl}/?authSource=%24external&authMechanism=${authMechanism}`;

// Create a new MongoClient.
const client = new MongoClient(uri);

async function run() {
  try {
    // Establish and verify connection.
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server.");
  } finally {
    // Ensure that the client closes when it finishes/errors.
    await client.close();
  }
}
run().catch(console.dir);
