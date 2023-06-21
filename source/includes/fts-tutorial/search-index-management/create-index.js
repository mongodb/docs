import { MongoClient } from "mongodb";

// connect to your Atlas deployment
const uri =  "<connection-string>";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("<databaseName>");
    const collection = database.collection("<collectionName>");
    
    // define your Atlas Search index
    const index = {
        name: "<index-name>",
        definition: {
            /* search index definition fields */
            "mappings": {
                "dynamic": true
            }
        }
    }

    // run the helper method
    const result = await collection.createSearchIndex(index);
    console.log(result);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
