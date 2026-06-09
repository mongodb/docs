const { MongoClient } = require("mongodb");

// connect to your Atlas cluster
const uri = "<connection-string>";
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();

        // set namespace
        const database = client.db("local_school_district");
        const coll = database.collection("schools");

        // define pipeline
        const agg = [
          {
            '$search': {
              'index': 'embedded-documents-tutorial', 
              'embeddedDocument': {
                'path': 'teachers',
                'operator': {
                  'compound': {
                    'must': [
                      {
                        'text': {
                          'path': 'teachers.first',
                          'query': 'John'
                        }
                      }
                    ],
                    'should': [
                      {
                        'text': {
                          'path': 'teachers.last',
                          'query': 'Smith'
                        }
                      }
                    ]
                  }
                }
              }, 
              'highlight': {
                'path': 'teachers.last'
              }
            }
          }, {
            '$project': {
              '_id': 1,
              'teachers': 1,
              'score': {
                '$meta': 'searchScore'
              }, 
              'highlights': {
                '$meta': 'searchHighlights'
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
