const { MongoClient } = require("mongodb");

// Replace the connection string with your MongoDB deployment's connection string
const uri =  "<connection-string>";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("sample_mflix");
    const collection = database.collection("movies");

    // Create the MongoDB Search index definition for the document field
    const index = {
        name: "default",
        definition: {
            "mappings": {
                "dynamic": false,
                "fields": {
                    "awards": {
                        "type": "document",
                        "dynamic": true
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