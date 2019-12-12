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

    // Query for a movie that has the title of type string
    const query = { title: { $type: "string" } };

    const options = {
      // sort matched documents in ascending order by rating
      sort: { rating: 1 },
      // Include only the `title` and `fullplot` fields in the returned document
      projection: { _id: 0, title: 1, fullplot: 1 }
    };

    collection.findOneAndDelete(query, options, function(error, result) {
      if (error) {
        console.log("Error: " + error.errmsg);
      } else {
        if (result.lastErrorObject.n == 1) {
          console.log("Deleted document:");
          console.dir(result.value);
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
