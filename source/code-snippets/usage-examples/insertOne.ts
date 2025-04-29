import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "<connection string uri>";

const client = new MongoClient(uri);

interface Movie {
  title: string;
  content: string[];
  year: number;
  cast: string[];
}

async function run() {
  try {
    const database = client.db("sample_mflix");
    // Specifying a Schema is optional, but it enables type hints on
    // finds and inserts
    const movies = database.collection<Movie>("movies");
    const result = await movies.insertOne({
      title: "Charade",
      genres: ["Comedy", "Romance", "Thriller"],
      year: 1963,
      cast: ["Cary Grant", "Audrey Hepburn", "Walter Matthau"],
    });
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
