const { MongoClient } = require("mongodb");

// Replace the connection string with your MongoDB deployment's connection string
const uri =  "<connection-string>";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("<database>");
    const collection = database.collection("<collection>");

    // Create the MongoDB Search index definition for the embeddedDocuments field
    const index = {
        name: "default",
        definition: {
          "mappings": {
            "dynamic": true, // or false, or { "typeset": "<type-set-name>" }
            "fields": {
              "<field-name>": {
                "type": "embeddedDocuments",
                "dynamic": true, // or false, or { "typeSet": "<type-set-name>" }
                "fields": {
                  "<field-name>": {
                    // <field-mapping-definition>
                  }
                },
                "storedSource": true // or false, or { "include": ["<field-name>", ...] } or { "exclude": ["<field-name>", ...] }
              }
              // ... additional fields
            }
          },
          "typeSets": [
            {
              "name": "<type-set-name>",
              "types": [
                {
                  "type": "<field-type>"
                  // ... additional field type configuration
                }
                // ... additional types
              ]
            }
            // ... additional typeSets
          ]
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
