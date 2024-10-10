import { MongoClient } from 'mongodb';

// Connect to your Atlas deployment
const client = new MongoClient(process.env.ATLAS_CONNECTION_STRING);

async function run() {
    try {
      const database = client.db("sample_airbnb");
      const collection = database.collection("listingsAndReviews");

      // Define your Atlas Vector Search index
      const index = {
          name: "vector_index",
          type: "vectorSearch",
          definition: {
            "fields": [
              {
                "type": "vector",
                "numDimensions": 1024,
                "path": "embeddings",
                "similarity": "cosine"
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