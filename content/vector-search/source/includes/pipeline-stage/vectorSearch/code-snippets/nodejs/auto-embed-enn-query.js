const { MongoClient } = require("mongodb");

// connect to your Atlas cluster
const uri = "<connection-string>";
    
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();

        // set namespace
        const database = client.db("sample_mflix");
        const coll = database.collection("movies");

        // define pipeline
        const agg = [
            {
              '$vectorSearch': {
                'index': 'vector_index', 
                'path': 'fullplot', 
                'query': {
                    "text": "solo traveler discovering new cultures"
                }, 
                'model': 'voyage-4',
                'exact': true, 
                'limit': 10
              }
            }, {
              '$project': {
                '_id': 0, 
                'fullplot': 1, 
                'title': 1, 
                'score': {
                  '$meta': 'vectorSearchScore'
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
