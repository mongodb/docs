const { MongoClient } = require("mongodb");

// connect to your Atlas deployment
const uri =  "<connection-string>";

const client = new MongoClient(uri);

async function run() {
  try {

    // set namespace
    const database = client.db("sample_mflix");
    const collection = database.collection("users");

    // define your MongoDB Search index
    const index = {
      name: "default",
      definition: {
        /* search index definition fields */
        "mappings": {
          "dynamic": true,
          "fields": {
            "email": {
              "type": "autocomplete",
              "analyzer": "lucene.keyword",
              "tokenization": "nGram",
              "minGrams": 2,
              "maxGrams": 15,
              "foldDiacritics": false
            }
          }
        }
      }
    }

    // run the helper method
    const result = await collection.createSearchIndex(index);
    console.log("New index name: " + result);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);