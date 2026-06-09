const { MongoClient } = require("mongodb");

// Replace the connection string with your MongoDB deployment's connection string
const uri =  "<connection-string>";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("sample_supplies");
    const collection = database.collection("monthlyPhoneTransactions");

    // Create the MongoDB Search index definition
    const index = {
        name: "monthlySalesIndex",
        definition: {
            "mappings": {
                "dynamic": true
            }
        }
    }

    // Create the index
    const result = await collection.createSearchIndex(index);
    console.log("New index name: " + result);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
