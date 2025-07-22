// Cursor-based document retrieval
const { MongoClient } = require("mongodb");
const stream = require("stream");

// Replace the following string with your MongoDB deployment's connection string
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?writeConcern=majority";
const client = new MongoClient(uri);
// Asynchronous iteration by using cursor methods
async function asyncIteration(myColl) {
  // start async cursor example
  const cursor = myColl.find({});
  console.log("async");
  for await (const doc of cursor) {
    console.log(doc);
  }
  // end async cursor example
}
// Manual iteration using cursor methods
async function manualIteration(myColl) {
  // start manual cursor example
  const cursor = myColl.find({});

  while (await cursor.hasNext()) {
    console.log(await cursor.next());
  }
  // end manual cursor example
}
// Stream documents
async function streamAPI(myColl) {
  // start stream cursor example
  const cursor = myColl.find({});
  cursor.stream().on("data", doc => console.log(doc));
  // end stream cursor example
}
// Event-based iteration using cursor events
async function eventAPI(myColl) {
  // start event cursor example
  const cursor = myColl.find({});
  // the "data" event is fired once per document
  cursor.on("data", data => console.log(data));
  // end event cursor example
}
// Fetch all documents as an array using the toArray method
async function fetchAll(myColl) {
  // start fetchAll cursor example
  const cursor = myColl.find({});
  const allValues = await cursor.toArray();
  // end fetchAll cursor example
  console.log(allValues.length);
}
// Rewind the cursor
async function rewind(myColl) {
  // start rewind cursor example
  const cursor = myColl.find({});
  const firstResult = await cursor.toArray();
  console.log("First count: " + firstResult.length);
  await cursor.rewind();
  const secondResult = await cursor.toArray();
  console.log("Second count: " + secondResult.length);
  // end rewind cursor example
}
// Close a cursor
async function close(myColl) {
  const cursor = myColl.find({});

  // start close cursor example
  await cursor.close();
  // end close cursor example
}
// Abort in-progress operations
async function abort(myColl) {
  // start abort cursor example
  const controller = new AbortController();
  const { signal } = controller;

  process.on('SIGINT', () => controller.abort(new Error('^C pressed')));

  try {
    const cursor = myColl.find({}, { signal });
    for await (const doc of cursor) {
      console.log(doc);
    }
  } catch (error) {
    if (error === signal.reason) {
      console.error('Operation aborted:', error);
    } else {
      console.error('Unexpected error:', error);
    }
  }
  // end abort cursor example
}

async function run() {
  try {
    const database = client.db("test");
    const orders = database.collection("orders");

    await asyncIteration(orders);
    await manualIteration(orders);
    await streamAPI(orders);
    await eventAPI(orders);
    await fetchAll(orders);
    await rewind(orders);
    await count(orders);
    await abort(orders);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
