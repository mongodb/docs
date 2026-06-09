const { MongoClient } = require("mongodb");

// connect to your Atlas deployment
const uri =  
  "<connection-string>";

const client = new MongoClient(uri);

async function run() {
  try {

    // set namespace
    const database = client.db("local_school_district");
    const collection = database.collection("schools");
    
    // define your Atlas Search index
    const index = {
        name: "embedded-documents-tutorial",
        definition: {
          "mappings": {
            "dynamic": true,
            "fields": {
              "clubs": {
                "dynamic": true,
                "fields": {
                  "sports": {
                    "dynamic": true,
                    "type": "embeddedDocuments"
                  }
                },
                "type": "document"
              },
              "teachers": [
                {
                  "dynamic": true,
                  "fields": {
                    "classes": {
                      "dynamic": true,
                      "type": "embeddedDocuments"
                    }
                  },
                  "type": "embeddedDocuments"
                },
                {
                  "dynamic": true,
                  "fields": {
                    "classes": {
                      "dynamic": true,
                      "fields": {
                        "grade": {
                          "type": "token"
                        }
                      },
                      "type": "document"
                    }
                  },
                  "type": "document"
                }
              ]
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