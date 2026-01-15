const { MongoClient } = require("mongodb");

// connect to your Atlas cluster
const uri = "<CONNECTION-STRING>";

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
                'index': 'movies_automated_embeddings',
                'path': 'fullplot',
                'query': "young heroes caught in epic struggles between light and darkness",
                'numCandidates': 100,
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
