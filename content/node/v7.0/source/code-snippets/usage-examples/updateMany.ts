/* Update multiple documents */

import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "<connection string uri>";

const client = new MongoClient(uri);

enum Rating {
  G = "G",
  PG = "PG",
  PG_13 = "PG-13",
  R = "R",
  NR = "NOT RATED",
}

// Create a Movie interface
interface Movie {
  rated: Rating;
  random_review?: string;
}

async function run() {
  try {
    // Get the "movies" collection in the "sample_mflix" database
    const database = client.db("sample_mflix");
    const movies = database.collection<Movie>("movies");

    // Update all documents that match the specified filter
    const result = await movies.updateMany(
      { rated: Rating.G },
      {
        $set: {
          random_review: `After viewing I am ${
            100 * Math.random()
          }% more satisfied with life.`,
        },
      }
    );
    console.log(`Updated ${result.modifiedCount} documents`);
  } finally {
    // Close the database connection on completion or error
    await client.close();
  }
}
run().catch(console.dir);
