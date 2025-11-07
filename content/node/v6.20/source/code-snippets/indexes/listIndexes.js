// List indexes

const { MongoClient } = require("mongodb");

// Replace the placeholders with your credentials
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?writeConcern=majority";

const client = new MongoClient(uri);

// Access a collection from a database
const database = client.db("<databaseName>");
const collection = database.collection("<collectionName>");

async function run() {
  try {
    // start listIndexes example
    // List the indexes on the collection and output them as an array
    const result = await collection.listIndexes().toArray();
    
    // Print the list of indexes
    console.log("Existing indexes:\n");
    for(const doc in result){
        console.log(doc);
    }
    // end listIndexes example
  } finally {
    // Close the connection after the operation completes
    await client.close();
  }
}
// Run the program and print any errors
run().catch(console.dir);