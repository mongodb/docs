//	:replace-start: {
//	  "terms": {
//	    "process.env.CONNECTION_STRING": "\"<connection-string>\""
//	  }
//	}
import { MongoClient, ServerApiVersion } from 'mongodb';

// :snippet-start: stable-api-connect
// :uncomment-start:
//const { MongoClient, ServerApiVersion } = require("mongodb");
// :uncomment-end:

// Replace the placeholder with your Atlas connection string
const uri = process.env.CONNECTION_STRING;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function runStableAPIConnect() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    // Send a ping to confirm a successful connection
    const result = await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
    return result;
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
// :uncomment-start:
//runStableAPIConnect().catch(console.dir);
// :uncomment-end:
// :snippet-end:
// :replace-end:
