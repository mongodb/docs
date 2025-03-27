const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");

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
        '$search': {
          'index': 'compound-query-custom-score-tutorial',
          'compound': {
            'should': [
              {
                'compound': {
                  'must': [
                    {
                      'text': {
                        'query': 'ghost', 
                        'path': [ 'plot', 'title' ]
                      }
                    }
                  ], 
                  'mustNot': [
                    {
                      'in': {
                        'value': [ new ObjectId('573a13cdf29313caabd83c08'), new ObjectId('573a13cef29313caabd873a2')  ], 
                        'path': '_id'
                      }
                    }
                  ]
                }
              }, {
                'compound': {
                  'must': [
                    {
                      'text': {
                        'query': 'ghost', 
                        'path': [ 'plot', 'title' ]
                      }
                    }
                  ], 
                  'filter': [
                    {
                      'in': {
                        'value': [ new ObjectId('573a13cdf29313caabd83c08'), new ObjectId('573a13cef29313caabd873a2') ], 
                        'path': '_id'
                      }
                    }
                  ], 
                  'score': {
                    'boost': { 'value': 0.5 }
                  }
                }
              }
            ]
          }
        }
      }, {
        '$limit': 10
      }, {
        '$project': {
          '_id': 1, 
          'title': 1, 
          'plot': 1, 
          'score': { '$meta': 'searchScore' }
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
