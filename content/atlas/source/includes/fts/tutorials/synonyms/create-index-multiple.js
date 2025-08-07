const { MongoClient } = require("mongodb");

// connect to your Atlas deployment
const uri =  "<connection-string>";

const client = new MongoClient(uri);

async function run() {
  try {

    // set namespace
    const database = client.db("sample_mflix");
    const collection = database.collection("movies");

    // define your Atlas Search index
    const index = {
        name: "default",
        definition: {
            "mappings": {
                "dynamic": false,
                "fields": {
                    "title": {
                        "analyzer": "lucene.english",
                        "type": "string"
                    }
                }
            },
            "synonyms": [
                {
                    "analyzer": "lucene.english",
                    "name": "transportSynonyms",
                    "source": {
                        "collection": "transport_synonyms"
                    }
                },
                {
                    "analyzer": "lucene.english",
                    "name": "attireSynonyms",
                    "source": {
                        "collection": "attire_synonyms"
                    }
                }
            ]
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