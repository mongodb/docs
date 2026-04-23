const { MongoClient } = require("mongodb");

// connect to your Atlas deployment
const uri =  "<CONNECTION-STRING>";
const client = new MongoClient(uri);

async function run() {
    try {
      const database = client.db("<DATABASE-NAME>");
      const collection = database.collection("<COLLECTION-NAME>");

      // define your MongoDB Vector Search index
      const index = {
        "name": "<INDEX-NAME>",
        "type": "vectorSearch",
        "definition": {
          "fields": [
            {
              "type": "vector",
              "path": "<FIELD-NAME>",
              "model": "voyage-3-large | voyage-3.5 | voyage-3.5-lite"
            },
          ]
        }
      }
      // run the helper method
      await collection.createSearchIndex("<INDEX-NAME>", index);
    } finally {
      await client.close();
    }
}
run().catch(console.dir);