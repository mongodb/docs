import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "<connection string uri>";

const client = new MongoClient(uri);

interface Movie {
  title: string;
  genres: string[];
  year: number;
  cast: string[];
}

async function run() {
  try {
    const database = client.db("sample_mflix");
    // Specifying a schema is optional, but it enables type hints on
    // finds and inserts
    const movies = database.collection<Movie>("movies");

    const result = await movies.insertMany(
      { title: "Arsenic and Old Lace", genres: ["Comedy", "Romance"], year: 1944, cast: ["Cary Grant", "Priscilla Lane", "Raymond Massey"] },
      { title: "Ball of Fire", genres: ["Comedy", "Romance"], year: 1941, cast: ["Gary Cooper", "Barbara Stanwyck", "Oskar Homolka"] },
      { title: "I Married a Witch", genres: ["Comedy", "Fantasy", "Romance"], year: 1942, cast: ["Veronica Lake", "Fredric March", "Susan Hayward"] },
      { ordered: true }
    );
    console.log(`${result.insertedCount} documents were inserted`);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
