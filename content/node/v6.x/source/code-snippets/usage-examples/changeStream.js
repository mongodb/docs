// Watch for changes in a collection by using a change stream
import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "<connection string uri>";

const client = new MongoClient(uri);

// Declare a variable to hold the change stream
let changeStream;

// Define an asynchronous function to manage the change stream
async function run() {
  try {
    const database = client.db("insertDB");
    const haikus = database.collection("haikus");

    // Open a Change Stream on the "haikus" collection
    changeStream = haikus.watch();

    // Print change events as they occur
    for await (const change of changeStream) {
      console.log("Received change:\n", change);
    }
    // Close the change stream when done
    await changeStream.close();
    
  } finally {
    // Close the MongoDB client connection
    await client.close();
  }
}
run().catch(console.dir);
