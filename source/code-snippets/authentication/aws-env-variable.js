const { MongoClient } = require("mongodb");

// Remember to add your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY 
// credentials to your environment variables.
const clusterUrl = "<MongoDB cluster url>";
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
