const { MongoClient } = require("mongodb");

// Replace the uri string with your MongoDB deployments connection string.
const uri =
  "<connection-string>";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    // set namespace
    const database = client.db("sample_mflix");
    const coll = database.collection("movies");

    // define pipeline
    const agg = [
      {$search: {
        index: "sort-tutorial",
        near: {
          path: "year",
          origin: 2015,
          pivot: 5
        }}},
      {$limit: 5},
      {$project: {"title": 1, "released": 1, "year": 1}}
  ];
           
    // run pipeline
    const result = await coll.aggregate(agg);

    // print results
    await result.forEach((doc) => console.log(doc));
    
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
