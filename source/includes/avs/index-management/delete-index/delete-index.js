const { MongoClient } = require("mongodb");

// connect to your Atlas deployment
const uri = "<connectionString>";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("<databaseName>");
    const collection = database.collection("<collectionName>");

    // run the helper method
    await collection.dropSearchIndex("<indexName>");
    
  } finally {
    await client.close();
  }
}
run().catch(console.dir);