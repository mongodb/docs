const { MongoClient } = require("mongodb");

// Replace the following with your MongoDB deployment's connection
// string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?writeConcern=majority";

const client = new MongoClient(uri);

async function run() {
  try {
    // begin-idx
    // Get the database and collection on which to create the index 
    const myDB = client.db("testDB");
    const myColl = myDB.collection("blogPosts");

    // Create a text index on the "title" and "body" fields
    const result = await myColl.createIndex(
      { title: "text", body: "text" },
      {
         default_language: "english",
         weights: { body: 10, title: 3 }
      }
    );
    // end-idx
    console.log(`Index created: ${result}`);

    // begin-query
    // Query for documents where body or title contain "life ahead"
    const query = { $text: { $search: "life ahead" } };
    
    // Show only the title field
    const projection = { _id: 0, title: 1 };

    // Execute the find operation
    const cursor = myColl.find(query).project(projection);
    // end-query
    for await (const doc of cursor) {
      console.log(doc);
    }
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
