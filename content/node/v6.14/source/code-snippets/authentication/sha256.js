const { MongoClient } = require("mongodb");

// Replace the following with values for your environment.
const username = encodeURIComponent("<db_username>");
const password = encodeURIComponent("<db_password>");
const clusterUrl = "<MongoDB cluster url>";

const authMechanism = "SCRAM-SHA-256";

// Replace the following with your MongoDB deployment's connection string.
const uri =
  `mongodb+srv://${username}:${password}@${clusterUrl}/?authMechanism=${authMechanism}`;

// Create a new MongoClient
const client = new MongoClient(uri);

// Function to connect to the server
async function run() {
  try {
    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
