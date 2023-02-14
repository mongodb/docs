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

    // Create a multikey index on the "cast" field
    const result = await movies.createIndex({ cast: 1 });
    // end-idx

    console.log(`Index created: ${result}`);

    // begin-query
    const query = { cast: "Viola Davis" };
    const projection = { _id: 0, cast: 1 , title: 1 };

    const cursor = movies
      .find(query)
      .project(projection);
    // end-query

  } finally {
    await client.close();
  }
}
run().catch(console.dir);
