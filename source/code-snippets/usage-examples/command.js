// ignored first line
const { MongoClient } = require("mongodb");

// Replace the following string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useUnifiedTopology: true });

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
