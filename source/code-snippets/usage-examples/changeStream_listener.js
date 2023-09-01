/* Change stream listener */

import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string
const uri = "<connection string uri>";

const client = new MongoClient(uri);

const simulateAsyncPause = () =>
  new Promise(resolve => {
    setTimeout(() => resolve(), 1000);
  });

let changeStream;
async function run() {
  try {
    const database = client.db("insertDB");
    const haikus = database.collection("haikus");

    // Open a Change Stream on the "haikus" collection
    changeStream = haikus.watch();

    // Set up a change stream listener when change events are emitted
    changeStream.on("change", next => {
      // Print any change event
      console.log("received a change to the collection: \t", next);
    });

    // Pause before inserting a document
    await simulateAsyncPause();

    // Insert a new document into the collection
    await myColl.insertOne({
      title: "Record of a Shriveled Datum",
      content: "No bytes, no problem. Just insert a document, in MongoDB",
    });

    // Pause before closing the change stream
    await simulateAsyncPause();

    // Close the change stream and print a message to the console when it is closed
    await changeStream.close();    
    console.log("closed the change stream");
  } finally {
    // Close the database connection on completion or error
    await client.close();
  }
}
run().catch(console.dir);