const { MongoClient } = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string.
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
    const agg = [{
        '$search': {
          'index': 'diacritic-insensitive-tutorial',
          'compound': {
                'must': [{
                    'wildcard': {
                        'query': "allè*",
                        'path': "title",
                        'allowAnalyzedField': true
                    }
                }],
                'should': [{'text': {'query': 'Drama', 'path': 'genres'}}]
            }}},
        { '$project': { '_id': 0, 'title': 1 , 'genres': 1, 'score': {'$meta': 'searchScore'}}}];
           
    // run pipeline
    const result = await coll.aggregate(agg);

    // print results
    await result.forEach((doc) => console.log(doc));
    
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
