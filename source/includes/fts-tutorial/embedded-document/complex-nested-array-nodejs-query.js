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
                'path': 'clubs.sports', 
                'operator': {
                  'queryString': {
                    'defaultPath': 'clubs.sports.club_name', 
                    'query': 'dodgeball OR frisbee'
                  }
                }
              }
            }
          }, {
            '$project': {
              '_id': 1, 
              'name': 1, 
              'clubs.sports': 1, 
              'score': {
                '$meta': 'searchScore'
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