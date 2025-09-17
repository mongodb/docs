const { MongoClient } = require("mongodb");

// Replace the connection string with your MongoDB deployment's connection string
const uri =  "<connection-string>";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("sample_airbnb");
    const collection = database.collection("listingsAndReviews");

    // Create the MongoDB Search index definition for the geo field
    const index = {
        name: "default",
        definition: {
            "mappings": {
                "dynamic": false,
                "fields": {
                    "address": {
                        "type": "document",
                        "fields": {
                            "location": {
                                "type": "geo",
                                "indexShapes": true
                            }
                        }
                    }
                }
            }
        }
    }

    // Create the index
    const result = await collection.createSearchIndex(index);
    console.log("New index name: " + result);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);