const { MongoClient } = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?writeConcern=majority";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    const database = client.db("sample_mflix");
    const collection = database.collection("movies");

    // create a query for a movie to update
    const query = { title: "Blacksmith Scene" };
    const options = {
      // create a document if no documents match the query
      upsert: true,
    };
    // create a new document that will be used to replace the existing document
    const replacement = {
      title: "Sandcastles in the Sand",
      plot:
        "Robin Sparkles mourns for a relationship with a mall rat at an idyllic beach.",
    };

    const result = await collection.replaceOne(query, replacement, options);

    if (result.modifiedCount === 0 && result.upsertedCount === 0) {
      console.log("No changes made to the collection.");
    } else {
      if (result.matchedCount === 1) {
        console.log("Matched " + result.matchedCount + " documents.");
      }
      if (result.modifiedCount === 1) {
        console.log("Updated one document.");
      }
      if (result.upsertedCount === 1) {
        console.log(
          "Inserted one new document with an _id of " + result.upsertedId._id
        );
      }
    }
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
