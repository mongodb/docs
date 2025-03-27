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
        /* updated search index definition */
        "mappings": {
            "dynamic": false,
            "fields": {
              "<field-name>": {
                "type": "<field-type>"
              }
            }
        }
    }

    // run the helper method
    await collection.updateSearchIndex("<index-name>", index);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
