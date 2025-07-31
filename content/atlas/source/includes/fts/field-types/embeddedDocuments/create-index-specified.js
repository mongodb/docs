const { MongoClient } = require("mongodb");

// Replace the connection string with your MongoDB deployment's connection string
const uri =  "<connection-string>";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("sample_supplies");
    const collection = database.collection("sales");

    // Create the Atlas Search index definition for the embeddedDocuments field with specified fields
    const index = {
        name: "default",
        definition: {
            "mappings": {
                "fields": {
                    "items": {
                        "type": "embeddedDocuments",
                        "dynamic": false,
                        "fields": {
                            "name": {
                                "type": "string"
                            },
                            "tags": {
                                "type": "string"
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
