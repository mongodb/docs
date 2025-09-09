import { MongoClient } from 'mongodb';

// Connect to your MongoDB cluster
const client = new MongoClient(process.env.MONGODB_URI);

async function run() {
    try {
      const database = client.db("sample_airbnb");
      const collection = database.collection("listingsAndReviews");

      // Define your Vector Search index
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