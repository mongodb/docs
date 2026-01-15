const { MongoClient } = require("mongodb");

// connect to your deployment
const uri =  "<connectionString>";

const client = new MongoClient(uri);

async function run() {
   try {
     const database = client.db("sample_airbnb");
     const collection = database.collection("listingsAndReviews");

     // define your MongoDB Vector Search index
     const index = {
         name: "vector_index",
         type: "vectorSearch",
         definition: {
          "fields": [
            {
              "type": "autoEmbed",
              "modality": "text",
              "path": "summary",
              "model": "voyage-4"
            },
            {
              "type": "filter",
              "path": "address.country"
            },
            {
              "type": "filter",
              "path": "bedrooms"
            }
           ]
         }
     }

     // run the helper method
     const result = await collection.createSearchIndex(index);
     console.log(`New search index named ${result} is building.`);

     // wait for the index to be ready to query
     console.log("Polling to check if the index is ready. This may take up to a minute.")
     let isQueryable = false;
     while (!isQueryable) {
       const cursor = collection.listSearchIndexes();
       for await (const index of cursor) {
         if (index.name === result) {
           if (index.queryable) {
             console.log(`${result} is ready for querying.`);
             isQueryable = true;
           } else {
             await new Promise(resolve => setTimeout(resolve, 5000));
           }
         }
       }
     }
   } finally {
     await client.close();
   }
}
run().catch(console.dir);