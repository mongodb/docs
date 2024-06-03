const { MongoClient } = require("mongodb");

// connect to your Atlas deployment
const uri =  "<connectionString>";

const client = new MongoClient(uri);

async function run() {
   try {
     const database = client.db("<databaseName>");
     const collection = database.collection("<collectionName>");
    
     // define your Atlas Vector Search index
     const index = {
         name: "<indexName>",
         type: "vectorSearch",
         definition: {
           "fields": [
             {
               "type": "vector",
               "numDimensions": <numberOfDimensions>,
               "path": "<fieldToIndex>",
               "similarity": "euclidean | cosine | dotProduct"
             },
             {
               "type": "filter",
               "path": "<fieldToIndex>"
             },
             ...
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
