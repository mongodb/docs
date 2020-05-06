// ignored first line
const { MongoClient } = require("mongodb");

// Replace the following string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?w=majority";
const client = new MongoClient(uri);

async function word(movies) {
  // start word text example
  const query = { $text: { $search: "trek" } };

  // Return only the `title` of each matched document
  const projection = {
    _id: 0,
    title: 1,
  };

  // find documents based on our query and projection
  const cursor = movies.find(query).project(projection);
  // end word text example

  // print a message if no documents were found
  if ((await cursor.count()) === 0) {
    console.log("No documents found!");
  }
  await cursor.forEach(console.dir);
}

async function phrase(movies) {
  // start phrase text example
  const query = { $text: { $search: "\"star trek\"" } };

  // Return only the `title` of each matched document
  const projection = {
    _id: 0,
    title: 1,
  };

  // find documents based on our query and projection
  const cursor = movies.find(query).project(projection);
  // end phrase text example

  // print a message if no documents were found
  if ((await cursor.count()) == 0) {
    console.log("No documents found!");
  }
  await cursor.forEach(console.dir);
}

async function negation(movies) {
  // start negation text example
  const query = { $text: { $search: "\"star trek\"  -\"into darkness\"" } };

  // Include only the `title` field of each matched document
  const projection = {
    _id: 0,
    title: 1,
  };

  // find documents based on our query and projection
  const cursor = movies.find(query).project(projection);
  // end negation text example

  // print a message if no documents were found
  if ((await cursor.count()) == 0) {
    console.log("No documents found!");
  }
  await cursor.forEach(console.dir);
}

async function relevance(movies) {
  // start relevance text example
  const query = { $text: { $search: "\"star trek\"  -\"into darkness\"" } };

  // sort returned documents by descending text relevance score
  const sort = { score: { $meta: "textScore" } };
  // Include only the `title` and `score` fields in each returned document
  const projection = {
    _id: 0,
    title: 1,
    score: { $meta: "textScore" },
  };

  // find documents based on our query, sort, and projection
  const cursor = movies
    .find(query)
    .sort(sort)
    .project(projection);
  // end relevance text example

  // print a message if no documents were found
  if ((await cursor.count()) === 0) {
    console.log("No documents found!");
  }
  await cursor.forEach(console.dir);
}

async function run() {
  try {
    await client.connect();

    const database = client.db("sample_mflix");
    const collection = database.collection("movies");

    await word(collection);
    await phrase(collection);
    await negation(collection);
    await relevance(collection);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
