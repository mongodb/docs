// ignored first line
const { MongoClient } = require("mongodb");

// Replace the following with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    const database = client.db("sample_mflix");
    const collection = database.collection("movies");
    // create a filter for a movie to update
    const filter = { rated: "TV-G" };

    const options = {};

    // only include the following fields in the returned document
    options.projection = {
      title: 1,
      year: 1,
      rated: 1,
    };
    options.sort = {
      year: 1, // sort by year ascending to update the document with the earliest year
    };
    options.upsert = true; // create a document if no documents match the filter
    options.returnNewDocument = true; // return the updated document, not the original document

    const result = await collection.findOneAndUpdate(
      filter,
      {
        $set: {
          rated: "TV-PG",
        },
      },
      options,
    );
    console.log("results: \t", result);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
