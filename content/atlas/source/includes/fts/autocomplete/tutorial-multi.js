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
        const coll = database.collection("movies");

        // define pipeline
        const agg = [
            {
                '$search': {
                    'index': 'autocomplete-tutorial',
                    'compound': {
                        'should': [
                            {
                                'autocomplete': {
                                    'query': 'pri', 
                                    'path': 'title'
                                }
                            }, 
                            {
                                'autocomplete': {
                                    'query': 'pri', 
                                    'path': 'plot'
                                }
                            }
                        ], 
                        'minimumShouldMatch': 1
                    }
                }
            }, 
            {
                '$limit': 5
            }, 
            {
                '$project': {
                    '_id': 0, 
                    'title': 1, 
                    'plot': 1
                }
            }
        ];
        // run pipelines
        const result = await coll.aggregate(agg);

        // print results
        await result.forEach((doc) => console.log(doc));
    } finally {
        await client.close();
    }
}
run().catch(console.dir);
