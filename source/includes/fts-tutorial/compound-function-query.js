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
              'compound': {
                'must': [{'range': {'path': 'year', 'gte': 2013, 'lte': 2015}}],
                'should': [{'text': {'query': 'snow', 'path': 'title', 
                  'score': {'function': {'add': [{'path': {'value': 'imdb.rating', 'undefined': 2}}, 
                  {'score': 'relevance'}]}}}}]}, 
              'highlight':{'path': 'title'}}
        }, 
        {'$limit': 10},
        {'$project': {'_id': 0, 'title': 1, 'year': 1,
            'score': {'$meta': 'searchScore'}, 'highlights': {'$meta': "searchHighlights"}}}
        ];
        
        // run pipeline
        const result = coll.aggregate(agg);

        // print results
        result.forEach((doc) => console.dir(JSON.stringify(doc)));
    } finally {
        await client.close();
    }
}
run().catch(console.dir);
