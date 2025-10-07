const { MongoClient } = require("mongodb");

// Replace the connection string with your MongoDB deployment's connection string
const uri =  "<connection-string>";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("<database>");
    const collection = database.collection("<collection>");

    // Create the MongoDB Search index definition for the document field
    const index = {
        name: "default",
        definition: {
            "mappings": {
                "dynamic": true|false | { // "dynamic" can be a boolean or an object with "typeSet" name
                    "typeset": "<type-set-name>" 
                },
                "fields": {
                    "<field-name>": {
                        "type": "document",
                        "dynamic": true|false { // "dynamic" can be a boolean or an object with "typeSet" name
                            "typeset": "<type-set-name>" 
                        },
                        "fields": {
                            "<sub-field-name>": {
                                // Add field mapping definitions here
                            },
                            ... // additional sub-fields
                        }
                    },
                    ... // additional fields
                }
            },
            "typeSets": [
                {
                    "name": "<type-set-name>",
                    "types": [
                        {
                            "type": "<field-type>",
                            ... // field type configuration
                        },
                        ... // additional types
                    ]
                },
                ... // additional typeSets
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