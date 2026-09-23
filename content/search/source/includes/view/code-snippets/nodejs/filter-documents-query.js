import { MongoClient } from "mongodb";

// Connect to your Atlas deployment
const uri = "<connectionString>";
const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("sample_mflix");
    const collection = database.collection("movies_ReleasedAfter2000");

    // Run the aggregation query on the View
    const pipeline = [
      {
        $search: {
          index: "releasedAfter2000Index",
          text: {
            path: "title",
            query: "foo"
          },
          sort: {
            released: 1
          }
        }
      }
    ];

    const results = await collection.aggregate(pipeline).toArray();
    console.log(results);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
