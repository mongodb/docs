import { MongoClient } from "mongodb";

// connect to your Atlas deployment
const uri =  "<connection-string>";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("<databaseName>");
    const collection = database.collection("<collectionName>");

    // define an array of Atlas Search indexes
    const indexes = [
        {
            name: "<first-index-name>",
            definition: {
                /* search index definition fields */
            }
        },
        ...
        {
            name: "<last-index-name>",
            definition: {
                /* search index definition fields */
            }
        }
    ]
    
    // run the helper method
    const result = await collection.createSearchIndexes(indexes);
    console.log(result);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
