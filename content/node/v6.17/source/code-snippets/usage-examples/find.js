import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "<connection string uri>";

const client = new MongoClient(uri);

async function run() {
  try {
    
    // Get the database and collection on which to run the operation
    const database = client.db("sample_mflix");
    const movies = database.collection("movies");

    // Query for movies that have a runtime less than 15 minutes
    const query = { runtime: { $lt: 15 } };
    const sortFields = { title: 1 };
    const projectFields = { _id: 0, title: 1, imdb: 1 };

    // Execute query 
    const cursor = movies.find(query).sort(sortFields).project(projectFields);

    // Print a message if no documents were found
    if ((await movies.countDocuments(query)) === 0) {
      console.log("No documents found!");
    }

    // Print returned documents
    for await (const doc of cursor) {
      console.dir(doc);
    }

  } finally {
    await client.close();
  }
}
run().catch(console.dir);
