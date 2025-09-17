import { MongoClient } from 'mongodb';

// Connect to your Atlas deployment
const client = new MongoClient(process.env.ATLAS_CONNECTION_STRING);

async function run() {
    try {
      const database = client.db("sample_mflix");
      const collection = database.collection("embedded_movies");

      // define your MongoDB Vector Search index
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