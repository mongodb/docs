// ignored first line
const { MongoClient } = require("mongodb");

// Replace the following with your MongoDB deployment's connection
// string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function run() {
  try {
    await client.connect();

    const database = client.db("sample_mflix");
    const collection = database.collection("movies");

    // Query for a movie that has a title of type string
    const query = { title: { $type: "string" } };

    collection.deleteOne(query, options, function(error, result) {
      if (error) {
        console.log("Error: " + error.errmsg);
      } else {
        if (result.deletedCount == 1) {
          console.dir("Successfully deleted one document.");
        } else {
          console.log("No documents matched the query.");
        }
      }
    });
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
