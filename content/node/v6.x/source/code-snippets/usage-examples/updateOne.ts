// Update a document

import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string
const uri = "<connection string uri>";

const client = new MongoClient(uri);

// Define the Movie interface
interface Movie {
  plot: string;
  title: string;
}

async function run() {
  try {
    const database = client.db("sample_mflix");
    const movies = database.collection<Movie>("movies");

    /* Update a document that has the title "Random Harvest" to have a
    plot field with the specified value */
    const result = await movies.updateOne(
      { title: "Random Harvest" },
      {
        $set: {
          plot: `A harvest of random numbers, such as: ${Math.random()}`,
        },
      },
      /* Set the upsert option to insert a document if no documents
      match the filter */
      { upsert: true }
    );

    // Print the number of matching and modified documents
    console.log(
      `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
    );
  } finally {
    // Close the connection after the operation completes
    await client.close();
  }
}
// Run the program and print any thrown errors
run().catch(console.dir);
