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
                  'path': 'address.location',
                  'box': {
                    'bottomLeft': {
                      'type': 'Point',
                      'coordinates': [112.467, -55.050]
                    },
                    'topRight': {
                      'type': 'Point',
                      'coordinates': [168.000, -9.133]
                    }
                  }
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
