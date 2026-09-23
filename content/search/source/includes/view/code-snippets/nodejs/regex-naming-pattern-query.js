import { MongoClient } from "mongodb";

// Connect to your Atlas deployment
const uri = "<connectionString>";
const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("sample_airbnb");
    const collection = database.collection(
      "listings_SearchableTypes");

    // Run the aggregation query on the View
    const pipeline = [
      {
        $search: {
          index: "listingsSearchableTypes",
          compound: {
            should: [
              {
                equals: {
                  path: "searchable_types.property_type",
                  value: "House"
                }
              },
              {
                equals: {
                  path: "searchable_types.room_type",
                  value: "Private room"
                }
              }
            ]
          }
        }
      },
      { $limit: 10 },
      {
        $project: {
          _id: 0,
          searchable_types: 1,
          name: 1
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
