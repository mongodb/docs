const { MongoClient } = require("mongodb");

// Replace the connection string with your MongoDB deployment's connection string
const uri =  "<connection-string>";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("sample_supplies");
    const collection = database.collection("sales");

    // Create the Atlas Search index definition for the embeddedDocuments field with dynamic mapping
    const index = {
        name: "default",
        definition: {
            "mappings": {
                "dynamic": true,
                "fields": {
                    "items": {
                        "dynamic": true,
                        "type": "embeddedDocuments"
                    },
                    "purchaseMethod": {
                        "type": "token"
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
