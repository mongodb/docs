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
        const agg = [
            {
                '$search': {
                    'index': 'null-check-tutorial',
                    'compound': {
                        'should': [{
                            'wildcard': {
                                'path': 'password', 
                                'query': '*', 
                                'allowAnalyzedField': true
                            }
                        }, 
                        {
                            'compound': {
                                'mustNot': {
                                    'exists': {
                                        'path': 'password'
                                    }
                                },
                                'score': { 'constant': { 'value': 2 } }
                            }
                        }]
                    }
                }
            },
            {    
                '$limit': 5   
            },
            {
                '$project': {'_id': 0, 'name': 1, 'password': 1, 'score': { '$meta': 'searchScore' }}
            }
        ];
        // run pipeline
        const result = await coll.aggregate(agg);

        // print results
        await result.forEach((doc) => console.log(doc));
    } finally {
        await client.close();
    }
}
run().catch(console.dir);

