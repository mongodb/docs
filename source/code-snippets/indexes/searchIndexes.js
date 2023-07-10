const { MongoClient } = require("mongodb");

// Replace the following with your MongoDB deployment's connection
// string.
const uri =
    "mongodb+srv://<user>:<password>@<cluster-url>?writeConcern=majority";

const client = new MongoClient(uri);

import {
    MongoClient
} from "mongodb";

async function run() {
    try {
        const database = client.db("<databaseName>");
        const collection = database.collection("<collectionName>");

        // start createSearchIndex example
        const index1 = {
            name: "search1",
            definition: {
                "mappings": {
                    "dynamic": true
                }
            }
        }
        await collection.createSearchIndex(index1);
        // end createSearchIndex example

        // start listSearchIndexes example
        const result = await collection.listSearchIndexes().toArray();
        console.log("Existing search indexes:\n");
        for (const doc in result) {
            console.log(doc);
        }
        // end listSearchIndexes example

        // start updateSearchIndex example
        const index2 = {
            "mappings": {
                "dynamic": true,
                "fields": {
                    "description": {
                        "type": "string"
                    }
                }
            }
        }
        await collection.updateSearchIndex("search1", index2);
        // end updateSearchIndex example

        // start dropSearchIndex example
        await collection.dropSearchIndex("search1");
        // end dropSearchIndex example
    } finally {
        await client.close();
    }
}
run().catch(console.dir);