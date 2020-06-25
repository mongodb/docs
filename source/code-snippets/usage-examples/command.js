const { MongoClient } = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?w=majority";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    const db = client.db("sample_mflix");
    // find the storage statistics for the "sample_mflix" database using the 'dbStats' command
    const result = await db.command({
      dbStats: 1,
    });
    console.log(result);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
