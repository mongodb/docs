import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?writeConcern=majority";

const client = new MongoClient(uri);

interface Movies {
  directors: string;
  year: number;
}

async function run() {
  try {
    await client.connect();

    // define a database and collection on which to run the method
    const database = client.db("sample_mflix");
    const movies = database.collection<Movies>("movies");

    const distinctValues = await movies.distinct("year", {
      directors: "Barbra Streisand",
    });

    console.log(distinctValues);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
