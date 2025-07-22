import { MongoClient } from "mongodb";

//start-csot
// Creates a new MongoClient with a client-level timeoutMS configuration
const uri = "<connection string uri>";
const client = new MongoClient(uri, {
  // Client-level timeout: 15 seconds
  timeoutMS: 15000
});

async function run() {
  try {
    const db = client.db("test-db");
    const coll = db.collection("test-collection");

    // Performs a query operation with an operation-level timeoutMS configuration
    const docs = await coll.find({}, 
        // Operation-level timeout: 10 seconds
        { timeoutMS: 10000 })
        .toArray(); 

    console.log(docs);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
//end-csot