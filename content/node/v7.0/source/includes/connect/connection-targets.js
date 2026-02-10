// start-connection-target-atlas
const { MongoClient, ServerApiVersion } = require("mongodb");

// Replace the placeholder with your Atlas connection string
const uri = "<connection string>";

// Creates a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
);

async function run() {
  try {
    // Connects the client to the server (optional starting in v4.7)
    await client.connect();

    // Sends a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
// end-connection-target-atlas

// start-local-connection-uri
const client = new MongoClient("mongodb://host1:27017");
// end-local-connection-uri

// start-localhost
const client = new MongoClient("mongodb://localhost:27017");
// end-localhost

// start-replica-set-option
const client = new MongoClient("mongodb://host1:27017,host2:27017,host3:27017/?replicaSet=myRs");
// end-replica-set-option
