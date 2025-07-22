const { MongoClient } = require("mongodb");

// Replace the following with values for your environment.
const accessKeyId = encodeURIComponent("<AWS_ACCESS_KEY_ID>");
const secretAccessKey = encodeURIComponent("<AWS_SECRET_ACCESS_KEY>");
const clusterUrl = "<MongoDB cluster url>";

const authMechanism = "MONGODB-AWS";

let uri =
  `mongodb+srv://${accessKeyId}:${secretAccessKey}@${clusterUrl}/?authSource=%24external&authMechanism=${authMechanism}`;
  
// Uncomment the following lines if your AWS authentication setup requires a session token.
// const sessionToken = encodeURIComponent("<AWS_SESSION_TOKEN>");
// uri = uri.concat(`&authMechanismProperties=AWS_SESSION_TOKEN:${sessionToken}`);

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
