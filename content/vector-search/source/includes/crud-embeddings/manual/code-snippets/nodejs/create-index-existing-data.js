import { MongoClient } from 'mongodb';

// connect to your MongoDB deployment
const client = new MongoClient(process.env.MONGODB_URI);

async function run() {
  try {
    const database = client.db("sample_airbnb");
    const collection = database.collection("listingsAndReviews");
   
    // Define your MongoDB Vector Search index
    const index = {
        name: "vector_index",
        type: "vectorSearch",
        definition: {
          "fields": [
            {
              "type": "vector",
              "path": "embedding",
              "similarity": "dotProduct",
              "numDimensions": <dimensions>
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
