import { MongoClient } from "mongodb";

// connect to your Atlas deployment
const uri =  "<connection-string>";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("sample_mflix");
    const collection = database.collection("movies_ReleasedAfter2000");
    
    // define your MongoDB Search index
    const index = {
        name: "releasedAfter2000Index",
        definition: {
          "mappings": {
            "dynamic": true
          }
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
