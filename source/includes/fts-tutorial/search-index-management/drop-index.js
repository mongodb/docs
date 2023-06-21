// connect to your Atlas deployment
const uri = "<connection-string>";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("<databaseName>");
    const collection = database.collection("<collectionName>");

    // run the helper method
    await collection.dropSearchIndex("<index-name>");
    
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
