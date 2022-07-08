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

interface Movie {
  rated: Rating;
  random_review?: string;
}

async function run() {
  try {
    const database = client.db("sample_mflix");
    const movies = database.collection<Movie>("movies");
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
    await client.close();
  }
}
run().catch(console.dir);
