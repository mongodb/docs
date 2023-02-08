import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "<connection string uri>";

const client = new MongoClient(uri);

let changeStream;
async function run() {
  try {
    const database = client.db("insertDB");
    const collection = database.collection("haikus");

    // Open a Change Stream on the "haikus" collection
    changeStream = collection.watch();

    // Print change events
    for await (const change of changeStream) {
      console.log("Received change:\n", change);
    }

    await changeStream.close();
    
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
