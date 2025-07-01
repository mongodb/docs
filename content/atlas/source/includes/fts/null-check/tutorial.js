const { MongoClient } = require("mongodb");

// connect to your Atlas cluster
const uri =
    "<connection-string>";

const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();

        // set namespace
        const database = client.db("sample_mflix");
        const coll = database.collection("users");

        // define pipeline
        const agg = [{
            '$search': {
              'index': 'null-check-tutorial',
              'compound': {
                'must': {
                  'exists': {
                    'path': 'password'
                  }
                },
                'mustNot': {
                  'wildcard': {
                    'path': 'password', 
                    'query': '*', 
                    'allowAnalyzedField': true
                  }
                }
              }
            }
        }];
        // run pipeline
        const result = await coll.aggregate(agg);

        // print results
        await result.forEach((doc) => console.log(doc));
    } finally {
        await client.close();
    }
}
run().catch(console.dir);

