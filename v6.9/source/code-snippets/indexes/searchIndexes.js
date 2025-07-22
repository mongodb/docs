// Search Index operations 
const { MongoClient } = require("mongodb");

// Replace the following with your MongoDB deployment's connection string
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
        // Create a search index
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

        // start vectorSearchIdx example
        // Create a Vector Search index
        const vectorSearchIdx = {
            name: "vsidx1",
            type: "vectorSearch",
            definition: {
                fields: [{
                    type: "vector",
                    numDimensions: 384,
                    path: "summary",
                    similarity: "dotProduct"
                }]
            }
        }
        
        await collection.createSearchIndex(vectorSearchIdx);
        // end vectorSearchIdx example

        // start listSearchIndexes example
        // List search indexes
        const result = await collection.listSearchIndexes().toArray();
        console.log("Existing search indexes:\n");
        for (const doc in result) {
            console.log(doc);
        }
        // end listSearchIndexes example

        // start updateSearchIndex example
        // Update a search index
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
        // Dropping (deleting) a search index
        await collection.dropSearchIndex("search1");
        // end dropSearchIndex example
    } finally {
        await client.close();
    }
}
run().catch(console.dir);