// begin x509 connection
const { MongoClient } = require('mongodb');
const fs = require('fs');

const client = new MongoClient('mongodb+srv://<cluster-url>?authMechanism=MONGODB-X509&ssl=true', {
  sslCA: fs.readFileSync('/etc/certs/mongodb/ca.pem'),
  sslKey: fs.readFileSync('/etc/certs/mongodb/client.pem'),
  sslCert: fs.readFileSync('/etc/certs/mongodb/client.pem')
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