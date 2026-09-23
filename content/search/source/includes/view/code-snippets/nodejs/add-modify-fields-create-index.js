import { MongoClient } from "mongodb";

// connect to your Atlas deployment
const uri =  "<connection-string>";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("sample_airbnb");
    const collection = database.collection("listingsAndReviews_totalPrice");
    
    // define your MongoDB Search index
    const index = {
        name: "totalPriceIndex",
        definition: {
          "mappings": {
            "dynamic": true
          },
          "storedSource": {
            "include": [
              "totalPrice"
            ]
          }
        }
    }

    // run the helper method
    const result = await collection.createSearchIndex(index);
    console.log(result);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
