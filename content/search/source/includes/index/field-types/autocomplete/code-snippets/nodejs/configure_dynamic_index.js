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
          "dynamic": {
            "typeSet": "moviesStringIndex"
          },
          "fields": {
            "poster": [],
            "languages": [],
            "rated": [],
            "lastupdated": [],
            "fullplot": [],
            "awards": []
          }
        },
        "typeSets": [
          {
            "name": "moviesStringIndex",
            "types": [
              {
                "type": "autocomplete"
              }
            ]
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