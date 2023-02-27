import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "<connection string uri>";

const client = new MongoClient(uri);

type Minutes = number;

interface IMDB {
  rating: number;
  votes: number;
  id: number;
}

interface Movie {
  title: string;
  imdb: IMDB;
  runtime: Minutes;
}

async function run() {
  try {
    const database = client.db("sample_mflix");
    const movies = database.collection<Movie>("movies");

    const query = { runtime: { $lt: 15 } };
    const cursor = movies.find<Movie>(
      query,
      {
        sort: { title: 1 },
        projection: { _id: 0, title: 1, imdb: 1 },
      }
    );

    if ((await movies.countDocuments(query)) === 0) {
      console.warn("No documents found!");
    }

    await cursor.forEach(console.dir);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
