// ignored first line
const { MongoClient } = require("mongodb");

// Replace the following with your MongoDB deployment's connection
// string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();

    const database = client.db("sample_mflix");
    const collection = database.collection("movies");

    // query for movies that have a runtime less than 15 minutes
    const query = { runtime: { $lt: 15 } };
    // sort returned documents in ascending order by title (A->Z)
    const sort = { title: 1 };
    // Include only the `title` and `imdb` fields in each returned document
    const projection = { _id: 0, title: 1, imdb: 1 };

    // find documents based on our query, sort, and projection
    const cursor = collection
      .find(query)
      .sort(sort)
      .project(projection);

    // print a message if no documents were found
    if (!(await cursor.hasNext())) {
      console.log("No documents found!");
    }

    await cursor.forEach(console.dir);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
