import { MongoClient } from "mongodb";

// Connect to your Atlas deployment
const uri = "<connectionString>";
const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("sample_airbnb");
    const collection = database.collection(
      "listingsAndReviews_totalPrice");

    // Run the aggregation query on the View
    const pipeline = [
      {
        $search: {
          index: "totalPriceIndex",
          range: {
            path: "totalPrice",
            lte: 300
          },
          returnStoredSource: true
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
