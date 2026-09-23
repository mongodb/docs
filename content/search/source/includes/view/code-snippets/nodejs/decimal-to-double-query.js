import { MongoClient } from "mongodb";

// Connect to your Atlas deployment
const uri = "<connectionString>";
const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("sample_airbnb");
    const collection = database.collection("listingsAndReviews");

    // Run the aggregation query
    const pipeline = [
      {
        $search: {
          index: "listingsSearchablePrice",
          range: {
            path: "totalPrice",
            gte: 100,
            lte: 200
          }
        }
      },
      {
        $project: {
          _id: 0,
          totalPrice: 1,
          price: 1,
          cleaning_fee: 1
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
