const { MongoClient } = require("mongodb");

// connect to your Atlas deployment
const uri =  "<CONNECTION-STRING>";
const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("sample_mflix");
    const collection = database.collection("movies");

    // define your MongoDB Vector Search index
    const index = {
      "name": "movies_automated_embeddings",
      "type": "vectorSearch",
      "definition": {
      "fields": [
        {
          "type": "text",
          "path": "fullplot",
          "model": "voyage-3-large"
        }
      ]
    }
  }
  // run the helper method
  await collection.createSearchIndex(index);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);