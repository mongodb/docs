// run-geo-box-metadata-query.js

// establish connection and set namespace
const { MongoClient } = require("mongodb");
const uri = "<connection-string>";
const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("sample_airbnb");
    const collection = database.collection("listingsAndReviews");

    // define query
    const agg = [
      {
        "$searchMeta": {
          "facet": {
            "operator": {
              "geoWithin": {
                "path": "address.location",
                "box": {
                  "bottomLeft": {
                    "type": "Point",
                    "coordinates": [112.467, -55.050]
                  },
                  "topRight": {
                    "type": "Point",
                    "coordinates": [168.000, -9.133]
                  }
                }
              }
            },
            "facets": {
              "propertyTypeFacet": {
                "type": "string",
                "path": "property_type"
              }
            }
          }
        }
      }
    ];

    // run query and print results
    const result = collection.aggregate(agg);
    await result.forEach((doc) => {
      console.log(JSON.stringify(doc, null, 2));
    });
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
