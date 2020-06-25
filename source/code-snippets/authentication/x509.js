const { MongoClient } = require("mongodb");

// Replace the following with values for your environment.
const username = encodeURIComponent("<client certificate distinguished name>");
const clusterUrl = "<MongoDB cluster url>";
const clientPEMFile = encodeURIComponent("<path to the client pem certificate file>");

const authMechanism = "MONGODB-X509";

// Replace the following with your MongoDB deployment's connection string.
const uri =
  `mongodb+srv://${username}@${clusterUrl}/?authMechanism=${authMechanism}&tls=true&tlsCertificateKeyFile=${clientPEMFile}`;

// Create a new MongoClient
const client = new MongoClient(uri);

// Function to connect to the server
async function run() {
  try {
    // Connect the client to the server
    await client.connect();

    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
