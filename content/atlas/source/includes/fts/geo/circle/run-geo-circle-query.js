const { MongoClient } = require("mongodb");

// connect to your Atlas cluster
const uri = "<connection-string>";

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
                'geoWithin': {
                  'circle': {
                    'center': {
                      'type': 'Point',
                      'coordinates': [-73.54, 45.54]
                    },
                    'radius': 1600
                  },
                  'path': 'address.location'
                }
              }
            }, {
              '$limit': 3
            }, {
              '$project': {
                '_id': 0,
                'name': 1,
                'address': 1
              }
            }
        ];

        // run pipeline
        const result = coll.aggregate(agg);

        // print results
        await result.forEach((doc) => console.log(doc));
    } finally {
        await client.close();
    }
}
run().catch(console.dir);
