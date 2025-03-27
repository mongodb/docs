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
        compound: {
          filter: {wildcard: {query: "Summer*", path: "title"}},
          must: [{near: {path: "released", origin: new Date("2014-04-18T00:00:00.000Z"), pivot: 13149000000}}]
        },
        sort: { released: -1 }
      }},
    {$limit: 5},
    {$project: {_id: 0, title: 1, released: 1, score: {$meta: "searchScore"}}}
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
