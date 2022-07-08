import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "<connection string uri>";

const client = new MongoClient(uri);

interface Movie {
  plot: string;
  title: string;
}

async function run() {
  try {
    const database = client.db("sample_mflix");
    const movies = database.collection<Movie>("movies");

    const result = await movies.updateOne(
      { title: "Random Harvest" },
      {
        $set: {
          plot: `A harvest of random numbers, such as: ${Math.random()}`,
        },
      },
      { upsert: true }
    );
    console.log(
      `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
    );
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
