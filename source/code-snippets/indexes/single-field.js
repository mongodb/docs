const { MongoClient } = require("mongodb");

// Replace the following with your MongoDB deployment's connection
// string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?writeConcern=majority";

const client = new MongoClient(uri);

async function run() {
  try {
    // begin-idx
    const database = client.db("sample_mflix");
    const movies = database.collection("movies");

    // Create an ascending index on the "title" field in the
    // "movies" collection.
    const result = await movies.createIndex({ title: 1 });
    console.log(`Index created: ${result}`);
    // end-idx

    // begin-query
    const query = { title: "Batman" }
    const sort = { title: 1 };
    const projection = { _id: 0, title: 1 };

    const cursor = movies
      .find(query)
      .sort(sort)
      .project(projection);
    // end-query
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
