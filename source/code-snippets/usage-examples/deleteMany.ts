import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?writeConcern=majority";

const client = new MongoClient(uri);

interface Movie {
  title: string;
}

async function run() {
  try {
    await client.connect();

    const database = client.db("sample_mflix");
    const movies = database.collection<Movie>("movies");
    const result = await movies.deleteMany({ title: { $regex: "Santa" } });
    console.log("Deleted " + result.deletedCount + " documents");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
