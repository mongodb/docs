import { MongoClient } from 'mongodb';

// Connect to your Atlas deployment
const client = new MongoClient(process.env.ATLAS_CONNECTION_STRING);

async function run() {
    try {
      const database = client.db("sample_mflix");
      const collection = database.collection("embedded_movies");

      // Define your Atlas Search index
      const index = {
          name: "rrf-full-text-search",
          type: "search",
          definition: {
            "mappings": {
              "dynamic": false,
              "fields": {
                "title": [{
                  "type": "string"
                }]
              }
            }
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
