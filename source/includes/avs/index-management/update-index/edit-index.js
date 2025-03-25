const { MongoClient } = require("mongodb");

// connect to your Atlas deployment
const uri =  "<connection-string>";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("<databaseName>");
    const collection = database.collection("<collectionName>");

    // define your Atlas Search index
    const index = {
        name: "<indexName>",
        type: "vectorSearch",
        //updated search index definition
        definition: {
          "fields": [
            {
              "type": "vector",
              "numDimensions": <numberOfDimensions>,
              "path": "<field-to-index>",
              "similarity": "euclidean | cosine | dotProduct"
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
