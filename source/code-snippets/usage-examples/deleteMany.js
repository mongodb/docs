// ignored first line
const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    const database = client.db("sample_mflix");
    const collection = database.collection("movies");
    // Query for all movies with the title "Santa Claus"
    const query = { title: "Santa Claus" };

    collection.deleteMany(query, options, function(err, r) {
      if (err) {
        console.log("Error: " + err.errmsg);
      } else {
        console.log("Deleted " + r.deletedCount + " documents");
      }
    });
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
