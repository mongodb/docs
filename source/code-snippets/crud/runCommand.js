import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "<connection string uri>";

const client = new MongoClient(uri);

async function run() {
  try {
    // start-runcommand
    const db = client.db("testDB");
    const cursor = await db.runCursorCommand({
        checkMetadataConsistency: 1,
    });
    for await (const doc of cursor) {
      console.log(doc);
    }
    // end-runcommand
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

