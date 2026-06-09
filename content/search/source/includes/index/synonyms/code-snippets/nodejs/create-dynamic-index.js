const { MongoClient } = require("mongodb");

// Replace the connection string with your MongoDB deployment's connection string
const uri =  "<connection-string>";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("sample_mflix");
    const collection = database.collection("movies");

    // Create the MongoDB Search index definition with dynamic mapping and synonyms
    const index = {
        name: "default",
        definition: {
            "mappings": {
                "dynamic": true
            },
            "synonyms": [
                {
                    "analyzer": "lucene.standard",
                    "name": "my_synonyms",
                    "source": {
                        "collection": "synonymous_terms"
                    }
                }
            ]
        }
    }

    // Create the index
    const result = await collection.createSearchIndex(index);
    console.log("New index name: " + result);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);