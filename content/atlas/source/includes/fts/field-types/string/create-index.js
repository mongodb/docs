const { MongoClient } = require("mongodb");

// connect to your Atlas deployment
const uri =  
  "<connection-string>";

const client = new MongoClient(uri);

async function run() {
  try {

    // set namespace
    const database = client.db("<database>");
    const collection = database.collection("<collection>");
    
    // define your Atlas Search index
    const index = {
        name: "default",
        definition: {
            /* search index definition fields */
            "mappings": {
                "dynamic": true|false,
                "fields": {
                    "<field-name>": {
                        "type": "string"
                    }
                }
            }
        }
    }

    // run the helper method
    const result = await collection.createSearchIndex(index);
    console.log("New index name: " + result);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);