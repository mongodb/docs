import { MongoClient } from "mongodb";

// start-operation
const uri = "<connection string uri>";
const client = new MongoClient(uri, {
  timeoutMS: 10000
});

async function run() {
    try {
      const db = client.db("test-db");
      const coll = db.collection("test-collection");

      const result = await coll.insertOne({ name: "Yngwie" });
      console.log("Insert result:", result);
    } finally {
      await client.close();
    }
  }
  
run().catch(console.dir);
// end-operation