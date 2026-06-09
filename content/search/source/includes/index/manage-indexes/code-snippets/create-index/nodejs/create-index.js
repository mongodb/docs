import { MongoClient } from "mongodb";

// connect to your Atlas deployment
const uri =  "<connectionString>";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("<databaseName>");
    const collection = database.collection("<collectionName>");
    
    // define your MongoDB Search index
    const index = {
        name: "<indexName>",
        definition: {
            /* search index definition fields */
            <indexDefinition>
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
