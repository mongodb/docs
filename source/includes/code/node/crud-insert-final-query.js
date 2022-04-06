const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
const uri =
"mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&writeConcern=majority";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    // database and collection code goes here
    const db = client.db("sample_guides");
    const coll = db.collection("comets");

    // insert code goes here
    const docs = [
      {Name: "Halley's Comet", OfficialName: "1P/Halley", OrbitalPeriod: 75, Radius: 3.4175, Mass: 2.2e14},
      {Name: "Wild2", OfficialName: "81P/Wild", OrbitalPeriod: 6.41, Radius: 1.5534, Mass: 2.3e13},
      {Name: "Comet Hyakutake", OfficialName: "C/1996 B2", OrbitalPeriod: 17000, Radius: 0.77671, Mass: 8.8e12}
    ];

    const result = await coll.insertMany(docs);

    // display insert ids code goes here
    console.log(result.insertedIds);

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
