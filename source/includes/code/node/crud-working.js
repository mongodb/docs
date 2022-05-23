/**
 * This is a working file to test various parts of the code we show users.
 * Do not include this file in any code shown.
 */
const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
// const uri =
//   "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&writeConcern=majority";
const uri =
  "mongodb+srv://foo:bar@cluster0.7stmv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();
    // database and collection code goes here
    const db = client.db("sample_guides");
    const coll = db.collection("planets");
    // find code goes here
    // const cursor = coll.find({ "surfaceTemperatureC.mean": { $lt: 15 } });
    // const cursor = coll.find({
    //   $and: [{ orderFromSun: { $gt: 2 } }, { orderFromSun: { $lt: 5 } }],
    // });
    const cursor = coll.find({
      $or: [{ orderFromSun: { $gt: 7 } }, { orderFromSun: { $lt: 2 } }],
    });
    // let cursor = coll.find({ hasRings: true });
    // iterate code goes here
    await cursor.forEach(console.log);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
