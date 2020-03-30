const { MongoClient } = require("mongodb");
const fs = require("fs");

// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?w=majority";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    const mflix = client.db("sample_mflix");

    // Replace with the path to your copy of the users.json file
    var users = JSON.parse(fs.readFileSync("<path/to/users.json/file"));

    var usersToInsert = [];

    // Loop through each user in the users array and format the data from
    // the JSON file to be a series of insertOne operations. Append
    // each appropriately formatted object to the usersToInsert array.
    users.forEach(user => {
      usersToInsert.push({ insertOne: { document: user } });
    });

    // Perform the bulk write operation and print out the number
    // of documents inserted and/or any error messages.
    // This is a routine data import
    // that does not rely on the ordering of the operations to ensure
    // data consistency, so you can set the ordered option to false
    // to improve write performance.
    mflix
      .collection("users")
      .bulkWrite(usersToInsert, { ordered: false }, (error, result) => {
        // The bulk write operation may successfully insert documents
        // and also return an error, so both cases must be handled.
        if (result.nInserted > 0) {
          console.log("Number of documents inserted: " + result.nInserted);
        } else {
          console.log(
            "No documents were inserted during the bulk write operation",
          );
        }

        if (error) {
          console.log("Error: " + error);
        }
      });
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
