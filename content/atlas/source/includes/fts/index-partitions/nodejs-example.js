import { MongoClient } from "mongodb";

// connect to your Atlas deployment
const uri =  "<connection-string>";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("sample_mflix");
    const collection = database.collection("movies");
    
    // define your Atlas Search index
    const index = {
        name: "partitioned_index",
        definition: {
            /* search index definition fields */
            "mappings": {
                "dynamic": true
            },
            "numPartitions": 4
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
