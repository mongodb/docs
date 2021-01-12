const { MongoClient } = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?writeConcern=majority";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    const database = client.db("sample_mflix");
    const collection = database.collection("theaters");

    const result = await collection.bulkWrite([
      { insertOne:
        {
          "document": {
            location: {
              address: { street1: '3 Main St.', city: 'Anchorage', state: 'AK', zipcode: '99501' },
            }
          }
        }
      },
      { insertOne:
        {
          "document": {
            location: {
              address: { street1: '75 Penn Plaza', city: 'New York', state: 'NY', zipcode: '10001' },
            }
          }
        }
      },
      { updateMany:
        {
          "filter": { "location.address.zipcode" : "44011" },
          "update": { $set : { "street2" : "25th Floor" } },
          "upsert": true
        }
      },
      { deleteOne :
        { "filter" : { "location.address.street1" : "221b Baker St"} }
      },
    ]);

    console.log(result);

  } finally {
    await client.close();
  }
}
run().catch(console.dir);
