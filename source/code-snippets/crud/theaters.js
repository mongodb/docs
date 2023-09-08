// Geospatial queries using proximity to a location and a specific geographic range 
const { MongoClient } = require("mongodb");

// Replace the following string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?writeConcern=majority";
const client = new MongoClient(uri);
// start proximity geo example
// Find theaters within a certain proximity
async function proximity(theaters) {
  // Define the query to find theaters near a specific location
  const query = {
    "location.geo": {
      $near: {
        $geometry: { type: "Point", coordinates: [-73.9667, 40.78] },
        $maxDistance: 10000,
      },
    },
  };
  // Find documents based on our query
  const cursor = theaters.find(query);
  // end proximity geo example

  // Print a message if no documents were found
  if ((await theaters.countDocuments(query)) === 0) {
    console.log("No documents found!");
  }
  // Iterate through the found documents and display them
  for await (const doc of cursor) {
    console.dir(doc);
  } 
}
// start range geo example
// Find theaters within a specific geographic range
async function range(theaters) {
  // Define the query to find theaters within a specified polygon
  const query = {
    "location.geo": {
      $geoWithin: {
        $geometry: {
          type: "Polygon",
          coordinates: [
            [
              [-72, 40], // Polygon coordinates defining the range
              [-74, 41],
              [-72, 39],
              [-72, 40],
            ],
          ],
        },
      },
    },
  };

  // Find documents based on our query
  const cursor = theaters.find(query);
  // end range geo example

  // Print a message if no documents were found
  if ((await theaters.countDocuments(query)) === 0) {
    console.log("No documents found!");
  }
  // Iterate through the found documents and display them
  for await (const doc of cursor) {
    console.dir(doc);
  } 
}

async function run() {
  try {
    const database = client.db("sample_mflix");
    const theaters = database.collection("theaters");

    await proximity(theaters);
    await range(theaters);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
