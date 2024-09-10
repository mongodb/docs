import { MongoClient } from 'mongodb';
// connect to your Atlas deployment
const uri =  "<connectionString>";
const client = new MongoClient(uri);
async function run() {
   try {
     const database = client.db("sample_db");
     const collection = database.collection("embeddings");
    
     // define your Atlas Vector Search index
     const index = {
         name: "vector_index",
         type: "vectorSearch",
         definition: {
           "fields": [
             {
               "type": "vector",
               "numDimensions": 768,
               "path": "embedding",
               "similarity": "euclidean"
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