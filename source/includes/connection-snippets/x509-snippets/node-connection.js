// begin x509 connection
const { MongoClient } = require('mongodb');
const fs = require('fs');

const credentials = fs.readFileSync('/etc/certs/mongodb/client.pem');

const client = new MongoClient('mongodb+srv://<cluster-url>/test?authSource=$external&retryWrites=true&w=majority&authMechanism=MONGODB-X509', {
  sslKey: credentials,
  sslCert: credentials
});

async function run() {
  try {
    await client.connect();
    const database = client.db("testDB");
    const collection = database.collection("testCol");
    const docCount = await collection.countDocuments({});
    console.log(docCount);
    // perform actions using client
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);
// end x509 connection