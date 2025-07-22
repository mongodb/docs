import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string
const uri = "<connection string uri>";

// Create a new client and connect to MongoDB
const client = new MongoClient(uri);

async function run() {
  try {
    // start-runcommand
    // Connect to the "testDB" database
    const db = client.db("testDB");

    // Run a cursor command to check metadata consistency within the database
    const cursor = await db.runCursorCommand({
        checkMetadataConsistency: 1,
    });
    // Iterate through the cursor's results and print the contents
    for await (const doc of cursor) {
      console.log(doc);
    }
    // end-runcommand
  } finally {
    // Close the MongoDB client connection
    await client.close();
  }
}
// Run the function and handle any errors
run().catch(console.dir);

