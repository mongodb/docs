const { MongoClient } = require("mongodb");

// Replace the placeholder with your connection string.
const uri = "<connection string>";
const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("sample_mflix");
    const collection = database.collection("movies");

    // Queries for documents that have a "title" value containing the word "Alabama"
    // begin-atlas-search
    const pipeline = [
        {
          $search: {
            index: "default", // Replace with your search index name
            text: {
              query: "Alabama",
              path: "title"
            }
          }
        },
        {
          $project: {
            title: 1
          }
        }
    ];

    const cursor = collection.aggregate(pipeline);
    for await (const document of cursor) {
      console.log(document);
    }
    // end-atlas-search
  } finally {
    await client.close();
  }
}

run().catch(console.dir);