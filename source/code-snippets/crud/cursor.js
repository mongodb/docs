const { MongoClient } = require("mongodb");
const stream = require("stream");

// Replace the following string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?writeConcern=majority";
const client = new MongoClient(uri);

async function forEachIteration(collection) {
  // start foreach cursor example
  const cursor = collection.find({});
  await cursor.forEach(doc => console.log(doc));
  // end foreach cursor example
  console.log(await cursor.count());
}

async function asyncIteration(collection) {
  // start async cursor example
  const cursor = collection.find({});
  console.log("async");
  for await (const doc of cursor) {
    console.log(doc);
  }
  // end async cursor example
}

async function manualIteration(collection) {
  // start manual cursor example
  const cursor = collection.find({});

  while (await cursor.hasNext()) {
    console.log(await cursor.next());
  }
  // end manual cursor example
}

async function streamAPI(collection) {
  // start stream cursor example
  const cursor = collection.find({});
  cursor.pipe(
    new stream.Writable({
      objectMode: true,
      write: function(doc, _, callback) {
        console.log(doc);
        callback();
      },
    }),
  );
  // end stream cursor example
}

async function eventAPI(collection) {
  // start event cursor example
  const cursor = collection.find({});
  // the "data" event is fired once per document
  cursor.on("data", data => console.log(data));
  // end event cursor example
}

async function fetchAll(collection) {
  // start fetchAll cursor example
  const cursor = collection.find({});
  const allValues = await cursor.toArray();
  // end fetchAll cursor example
  console.log(allValues.length);
}

async function rewind(collection) {
  // start rewind cursor example
  const cursor = collection.find({});
  const firstResult = await cursor.toArray();
  console.log("First count: " + firstResult.length);
  await cursor.rewind();
  const secondResult = await cursor.toArray();
  console.log("Second count: " + secondResult.length);
  // end rewind cursor example
}

async function count(collection) {
  // start count cursor example
  const cursor = collection.find({});
  const count = await cursor.count();
  // end count cursor example
  console.log(count);

  // start close cursor example
  await cursor.close();
  // end close cursor example
}

async function run() {
  try {
    await client.connect();

    const database = client.db("test");
    const orders = database.collection("orders");

    await forEachIteration(orders);
    await asyncIteration(orders);
    await manualIteration(orders);
    await streamAPI(orders);
    await eventAPI(orders);
    await fetchAll(orders);
    await rewind(orders);
    await count(orders);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
