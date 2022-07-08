import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "<connection string uri>";

const client = new MongoClient(uri);

interface Movie {
  directors: string;
  year: number;
}

async function run() {
  try {
    // define a database and collection on which to run the method
    const database = client.db("sample_mflix");
    const movies = database.collection<Movie>("movies");

    const distinctValues = await movies.distinct("year", {
      directors: "Barbra Streisand",
    });

    console.log(distinctValues);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
