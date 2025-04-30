const { MongoClient } = require("mongodb");

// Replace the placeholder with your connection string.
const uri = "<connection string>";
const client = new MongoClient(uri);

async function run() {
  try {
    // Accesses the test_database database
    // start-access-database
    const database = client.db("test_database");
    // end-access-database

    // Accesses the test_collection collection
    // start-access-collection
    const collection = database.collection("test_collection");
    // end-access-collection

    // Explicitly creates a collection in the database
    // start-create-collection
    const createColl = await database.createCollection("example_collection");
    // end-create-collection

    // Retrieves information about each collection in the database
    // start-find-collections
    const colls = database.listCollections();
    for await (const doc of colls) {
      console.log(doc)
    }
    // end-find-collections

    // Retrieves the name of each collection in the database
    // start-find-collection-names
    const names = database.listCollections({}, { nameOnly: true });
    for await (const doc of names) {
      console.log(doc)
    }
    // end-find-collection-names

    // Deletes the test_collection collection
    // start-delete-collection
    const collectionToDelete = database.collection("test_collection");
    await collectionToDelete.drop();
    // end-delete-collection
  } finally {
    await client.close();
  }
}

run().catch(console.dir);