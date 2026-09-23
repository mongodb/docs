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
        $searchMeta: {
          index: "listingsSearchableTypes",
          facet: {
            operator: {
              text: {
                path: "summary",
                query: "ocean view"
              }
            },
            facets: {
              idFacet: {
                type: "string",
                path: "idString",
                numBuckets: 10
              },
              hostFacet: {
                type: "string",
                path: "superHostString"
              }
            }
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
