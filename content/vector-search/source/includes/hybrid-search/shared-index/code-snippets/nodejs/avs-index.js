const { MongoClient } = require("mongodb");

// Connect to your MongoDB deployment
const MONGODB_URI = "<connection-string>";
const client = new MongoClient(MONGODB_URI);

async function run() {
    try {
      const database = client.db("sample_mflix");
      const collection = database.collection("embedded_movies");

      // Define your vector search index
      const index = {
          name: "hybrid-vector-search",
          type: "vectorSearch",
          definition: {
            "fields": [
              {
                "type": "vector",
                "numDimensions": 2048,
                "path": "plot_embedding_voyage_3_large",
                "similarity": "dotProduct"
              }
            ]
          }
      }

      // Call the method to create the index
      const result = await collection.createSearchIndex(index);
      console.log(result);
    } finally {
      await client.close();
    }
}
run().catch(console.dir);
