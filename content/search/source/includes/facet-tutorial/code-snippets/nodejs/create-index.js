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
    
    // define your MongoDB Search index
    const index = {
        name: "facet-tutorial",
        definition: {
            "mappings": {
                "dynamic": true,
                "fields": {
                    "genres": {
                        "type": "token"
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