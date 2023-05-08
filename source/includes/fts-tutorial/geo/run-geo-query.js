const { MongoClient } = require("mongodb");

// connect to your Atlas cluster
const uri ="<connection-string>";

const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();

        // set namespace
        const database = client.db("sample_airbnb");
        const coll = database.collection("listingsAndReviews");

        // define pipeline
        const agg = [
            {
              '$search': {
                'index': 'geo-json-tutorial',
                'compound': {
                  'must': [
                    {
                      'geoWithin': {
                        'geometry': {
                          'type': 'Polygon', 
                          'coordinates': [
                            [
                              [
                                -161.323242, 22.512557
                              ], [
                                -152.446289, 22.065278
                              ], [
                                -156.09375, 17.811456
                              ], [
                                -161.323242, 22.512557
                              ]
                            ]
                          ]
                        }, 
                        'path': 'address.location'
                      }
                    }
                  ], 
                  'should': [
                    {
                      'text': {
                        'path': 'property_type', 
                        'query': 'Condominium'
                      }
                    }
                  ]
                }
              }
            }, {
              '$limit': 10
            }, {
              '$project': {
                '_id': 0, 
                'name': 1, 
                'address': 1, 
                'property_type': 1, 
                'score': {
                  '$meta': 'searchScore'
                }
              }
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
