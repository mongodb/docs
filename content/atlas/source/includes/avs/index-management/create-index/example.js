const { MongoClient } = require("mongodb");

// connect to your deployment
const uri =  "<connection-string>";

const client = new MongoClient(uri);

async function run() {
   try {
     const database = client.db("sample_mflix");
     const collection = database.collection("embedded_movies");
    
     // define your MongoDB Vector Search index
     const index = {
         name: "vector_index",
         type: "vectorSearch",
         definition: {
           "fields": [
             {
               "type": "vector",
               "numDimensions": 2048,
               "path": "plot_embedding_voyage_3_large",
               "similarity": "dotProduct"
             },
             {
                "type": "filter",
                "path": "genres"
              },
              {
                "type": "filter",
                "path": "year"
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
