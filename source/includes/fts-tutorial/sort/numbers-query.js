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
      {
        '$search': {
          'index': 'sort-tutorial',
          'range': {
            'path': 'awards.wins', 
            'gte': 10
          }, 
          'sort': {
            'awards.wins': -1
          }
        }
      }, {
        '$limit': 5
      }, {
        '$project': {
          '_id': 0, 
          'title': 1, 
          'awards.wins': 1
        }
      }
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
