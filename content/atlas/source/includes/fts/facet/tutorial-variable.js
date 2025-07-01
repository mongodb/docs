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
              '$search': {
                'index': "facet-tutorial",
                'facet': {
                  'operator': {
                    'near': {
                      'path': 'released', 
                      'origin': new Date('Tue, 01 Nov 1921 00:00:00 GMT'), 
                      'pivot': 7776000000
                    }
                  }, 
                  'facets': {
                    'genresFacet': {
                      'type': 'string', 
                      'path': 'genres'
                    }, 
                    'yearFacet': {
                      'type': 'number', 
                      'path': 'year', 
                      'boundaries': [1910, 1920, 1930, 1940]
                    }
                  }
                }
              }
            }, {
              '$facet': {
                'meta': [
                  {
                    '$replaceWith': '$$SEARCH_META'
                  }, {
                    '$limit': 1
                  }
                ]
              }
            }, {
              '$set': {
                'meta': {
                  '$arrayElemAt': ['$meta', 0]
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
