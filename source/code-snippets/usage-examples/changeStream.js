// ignored first line
const { MongoClient } = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&w=majority&useUnifiedTopology=true";

const client = new MongoClient(uri);

let changeStream;
async function run() {
  try {
    await client.connect();
    const database = client.db("sample_mflix");
    const collection = database.collection("movies");

    // open a Change Stream on the "movies" collection
    changeStream = collection.watch();

    // set up a listener when change events are emitted
    changeStream.on("change", next => {
      // process any change event
      console.log("received a change to the collection: \t", next);
    });

    // wrap the setTimeout methods in a new Promise to wait for the timers to run
    await new Promise(resolve => {
      // wait for the event listener to register before inserting a document
      setTimeout(async () => {
        await collection.insertOne({
          test: "sample movie document",
        });
        // wait to close `changeStream` after the listener receives the event
        setTimeout(async () => {
          resolve(await changeStream.close());
        }, 1000);
      }, 1000);
    });
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
