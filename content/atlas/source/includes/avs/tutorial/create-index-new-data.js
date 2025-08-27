import { MongoClient } from 'mongodb';

// connect to your MongoDB deployment
const client = new MongoClient(process.env.MONGODB_URI);

async function run() {
   try {
     const database = client.db("sample_db");
     const collection = database.collection("embeddings");
    
     // define your MongoDB Vector Search index
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
     // run the helper method
     const result = await collection.createSearchIndex(index);
     console.log(result);
   } finally {
     await client.close();
   }
}
run().catch(console.dir);