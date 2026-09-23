import { MongoClient } from "mongodb";

// connect to your Atlas deployment
const uri =  "<connection-string>";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("sample_airbnb");
    const collection = database.collection("listings_SearchableTypes");
    
    // define your MongoDB Search index
    const index = {
        name: "listingsSearchableTypes",
        definition: {
          "mappings": {
            "dynamic": true,
            "fields": {
              "idString": {
                "type": "token"
              },
              "superHostString": {
                "type": "token"
              }
            }
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
