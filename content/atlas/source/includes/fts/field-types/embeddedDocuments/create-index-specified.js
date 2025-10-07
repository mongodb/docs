const { MongoClient } = require("mongodb");

// Replace the connection string with your MongoDB deployment's connection string
const uri =  "<connection-string>";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("sample_training");
    const collection = database.collection("companies");

    // Create the MongoDB Search index definition for the embeddedDocuments field with specified fields
    const index = {
        name: "default",
        definition: {
            "mappings": {
                "fields": {
                    "offices": {
                        "type": "embeddedDocuments",
                        "dynamic": false,
                        "fields": {
                            "country_code": {
                                "type": "string"
                            },
                            "state_code": {
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
