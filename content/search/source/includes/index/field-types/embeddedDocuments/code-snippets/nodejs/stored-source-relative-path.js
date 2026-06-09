const { MongoClient } = require("mongodb");

// Replace the connection string with your MongoDB deployment's connection string
const uri =  "<connection-string>";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("sample_training");
    const collection = database.collection("companies");

    // Create the Atlas Search index definition for the embeddedDocuments field
    const index = {
        name: "default",
        definition: {
            "mappings": { 
              "dynamic": false,
              "fields": { 
                "funding_rounds": { 
                  "type": "embeddedDocuments",
                  "dynamic": true,
                  "storedSource": {
                    "include": ["round_code", "raised_currency_code", "raised_amount"] 
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
