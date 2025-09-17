const { MongoClient } = require("mongodb");

// Replace the connection string with your MongoDB deployment's connection string
const uri =  "<connection-string>";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("sample_mflix");
    const collection = database.collection("movies");

    // Create the MongoDB Search index definition for the plot field with synonyms
    const index = {
        name: "default",
        definition: {
            "mappings": {
                "dynamic": false,
                "fields": {
                    "plot": {
                        "type": "string",
                        "analyzer": "lucene.english"
                    }
                }
            },
            "synonyms": [
                {
                    "analyzer": "lucene.english",
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