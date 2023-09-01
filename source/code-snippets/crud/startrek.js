/* Text search */

const { MongoClient } = require("mongodb");

// Replace the following string with your MongoDB deployment's connection string
const uri = "mongodb+srv://<user>:<password>@<cluster-url>?writeConcern=majority";
const client = new MongoClient(uri);

async function word(movies) {
  // start word text example
  // Create a query that searches for the string "trek"
  const query = { $text: { $search: "trek" } };

  // Return only the `title` of each matched document
  const projection = {
    _id: 0,
    title: 1,
  };

  // Find documents based on our query and projection
  const cursor = movies.find(query).project(projection);
  // end word text example

  // Print a message if no documents were found
  if ((await movies.countDocuments(query)) === 0) {
    console.log("No documents found!");
  }
  // Print all documents that were found
  for await (const doc of cursor) {
    console.dir(doc);
  } 
}

async function phrase(movies) {
  // start phrase text example
  // Create a query that searches for the phrase "star trek"
  const query = { $text: { $search: "\"star trek\"" } };

  // Return only the `title` of each matched document
  const projection = {
    _id: 0,
    title: 1,
  };

  // Find documents based on the query and projection
  const cursor = movies.find(query).project(projection);
  // end phrase text example

  // Print a message if no documents were found
  if ((await movies.countDocuments(query)) === 0) {
    console.log("No documents found!");
  }
  // Print all documents that were found
  for await (const doc of cursor) {
    console.dir(doc);
  } 
}

async function negation(movies) {
  // start negation text example
  // Create a query that searches for the phrase "star trek" while omitting "into darkness"
  const query = { $text: { $search: "\"star trek\"  -\"into darkness\"" } };

  // Include only the `title` field of each matched document
  const projection = {
    _id: 0,
    title: 1,
  };

  // Find documents based on the query and projection
  const cursor = movies.find(query).project(projection);
  // end negation text example

  // Print a message if no documents were found
  if ((await movies.countDocuments(query)) === 0) {
    console.log("No documents found!");
  }
  // Print all documents that were found
  for await (const doc of cursor) {
    console.dir(doc);
  } 
}

async function relevance(movies) {
  // start relevance text example
  // Create a query that searches for the phrase "star trek" while omitting "into darkness"r
  const query = { $text: { $search: "\"star trek\"  -\"into darkness\"" } };

  // Sort returned documents by descending text relevance score
  const sort = { score: { $meta: "textScore" } };

  // Include only the `title` and `score` fields in each returned document
  const projection = {
    _id: 0,
    title: 1,
    score: { $meta: "textScore" },
  };

  // Find documents based on the query, sort, and projection
  const cursor = movies
    .find(query)
    .sort(sort)
    .project(projection);
  // end relevance text example

  // Print a message if no documents were found
  if ((await movies.countDocuments(query)) === 0) {
    console.log("No documents found!");
  }
  // Print all documents that were found
  for await (const doc of cursor) {
    console.dir(doc);
  } 
}

async function run() {
  try {
    const database = client.db("sample_mflix");
    const movies = database.collection("movies");

    await word(movies);
    await phrase(movies);
    await negation(movies);
    await relevance(movies);
  } finally {
    // Close the database connection on completion or error
    await client.close();
  }
}
run().catch(console.dir);
