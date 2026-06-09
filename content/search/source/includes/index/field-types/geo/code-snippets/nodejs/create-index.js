const { MongoClient } = require("mongodb");

// Replace the connection string with your MongoDB deployment's connection string
const uri =  "<connection-string>";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("<database>");
    const collection = database.collection("<collection>");

    // Create the MongoDB Search index definition for the geo field
    const index = {
        name: "default",
        definition: {
            "mappings": {
                "dynamic": true|false,
                "fields": {
                    "<field-name>": {
                        "type": "geo",
                        "indexShapes": true|false
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