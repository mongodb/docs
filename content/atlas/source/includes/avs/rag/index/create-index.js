import { MongoClient } from 'mongodb';

// Connect to your MongoDB cluster
const client = new MongoClient(process.env.MONGODB_URI);

async function run() {
    try {
      const database = client.db("rag_db");
      const collection = database.collection("test");
     
      // Define your Vector Search index
      const index = {
          name: "vector_index",
          type: "vectorSearch",
          definition: {
            "fields": [
              {
                "type": "vector",
                "path": "embedding",
                "similarity": "cosine",
                "numDimensions": <dimensions> // Replace with the number of dimensions of your embeddings
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
