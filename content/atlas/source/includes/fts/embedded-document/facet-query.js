const { MongoClient } = require("mongodb");

// connect to your Atlas cluster
const uri = "<connection-string>";
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();

        // set namespace
        const database = client.db("local_school_district");
        const coll = database.collection("schools");

        // define pipeline
        const agg = [
            {
                "$searchMeta": {
                  "index": "embedded-documents-tutorial",
                  "facet": {
                    "operator": {
                      "text":{
                        "path": "name",
                        "query": "High"
                      }
                    },
                    "facets": {
                      "gradeFacet": {
                        "type": "string",
                        "path": "teachers.classes.grade"
                      }
                    }
                  }
                }
              }
        ];
        
        // run pipeline
        const result = coll.aggregate(agg);

        // print results
        await result.forEach((doc) => console.dir(JSON.stringify(doc)));
    } finally {
        await client.close();
    }
}
run().catch(console.dir);