import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "<connection string uri>";

const client = new MongoClient(uri);

interface Movie {
  title: string;
}

async function run() {
  try {
    const database = client.db("sample_mflix");
    const movies = database.collection<Movie>("movies");

    const result = await movies.replaceOne(
      { title: { $regex: "The Cat from" } },
      {
        title: `The Cat from Sector ${Math.floor(Math.random() * 1000) + 1}`,
      }
    );
    console.log(`Modified ${result.modifiedCount} document(s)`);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
