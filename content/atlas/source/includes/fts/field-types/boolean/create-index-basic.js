const { MongoClient } = require("mongodb");
// Replace the connection string with your MongoDB deployment's connection string
const uri =  "<connection-string>";
const client = new MongoClient(uri);
async function run() {
  try {
    const database = client.db("sample_analytics");
    const collection = database.collection("customers");
    // Create the MongoDB Search index definition for the boolean field
    const index = {
        name: "default",
        definition: {
            "mappings": {
                "dynamic": false,
                "fields": {
                    "active": {
                        "type": "boolean"
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
