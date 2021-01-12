const { MongoClient } = require("mongodb");

// Replace the following with your MongoDB deployment's connection
// string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?writeConcern=majority";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    // begin-idx
    const db = client.db("sample_mflix");
    const movies = db.collection("movies");

    // Create a multikey index on the "cast" array field
    // in the "movies" collection.
    const result = await movies.createIndex({ cast: 1 });
    console.log(`Index created: ${result}`);
    // end-idx

    // begin-query
    const query = { cast: "Burt Reynolds" };
    const sort = { cast: 1, genre: 1 };
    const projection = { cast: 1 };

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
