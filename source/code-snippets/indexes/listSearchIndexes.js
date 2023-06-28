const { MongoClient } = require("mongodb");

// Replace the following with your MongoDB deployment's connection
// string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?writeConcern=majority";

const client = new MongoClient(uri);

import { MongoClient } from "mongodb";
const database = client.db("<databaseName>");
const collection = database.collection("<collectionName>");

async function run() {
  try {
    // start listSearchIndexes example
    const result = await collection.listSearchIndexes().toArray();
    console.log("Existing search indexes:\n");
    for(const doc in result){
        console.log(doc);
    }
    // end listSearchIndexes example
  } finally {
    await client.close();
  }
}
run().catch(console.dir);