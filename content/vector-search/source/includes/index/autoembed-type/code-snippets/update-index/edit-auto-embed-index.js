const { MongoClient } = require("mongodb");

// connect to your deployment
const uri =  "<connection-string>";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("<databaseName>");
    const collection = database.collection("<collectionName>");

    // define your MongoDB Search index
    const index = {
        name: "<indexName>",
        type: "vectorSearch",
        //updated search index definition
        definition: {
          "fields": [
            {
              "type": "autoEmbed",
              "modality": "text",
              "path": "<fieldToIndex>",
              "model": "<embeddingModel>"
            },
            {
              "type": "filter",
              "path": "<fieldToIndex>"
            },
            ...
          ]
        }
    }

    // run the helper method
    await collection.updateSearchIndex("<index-name>", index);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
