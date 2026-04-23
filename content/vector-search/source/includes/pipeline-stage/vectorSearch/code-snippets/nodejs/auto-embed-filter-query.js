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
          'filter': {
            '$and': [
              {
                'year': {
                  '$gt': 1980
                }
              }, 
              {
                'year': {
                  '$lt': 2020
                }
              },
              {  
                'genres': {  
                  '$in': ['Action', 'Adventure', 'Family']
                }  
              } 
            ]
          }, 
          'query': {
            "text": "epic fantasy journey with reluctant heroes"
          }, 
          'model': 'voyage-4',
          'numCandidates': 100, 
          'limit': 10
        }
      }, {
        '$project': {
          '_id': 0, 
          'title': 1, 
          'fullplot': 1, 
          'year': 1, 
          'genres': 1,
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
