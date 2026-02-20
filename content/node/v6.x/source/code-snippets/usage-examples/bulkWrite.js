// Bulk write operation

// Import MongoClient from the MongoDB node driver package
const { MongoClient } = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string
const uri = "<connection string uri>";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("sample_mflix");
    const theaters = database.collection("theaters");

    // Insert a new document into the "theaters" collection
    const result = await theaters.bulkWrite([
      {
        insertOne: {
          document: {
            location: {
              address: {
                street1: "3 Main St.",
                city: "Anchorage",
                state: "AK",
                zipcode: "99501",
              },
            },
          },
        },
      },
      {
        insertOne: {
          document: {
            location: {
              address: {
                street1: "75 Penn Plaza",
                city: "New York",
                state: "NY",
                zipcode: "10001",
              },
            },
          },
        },
      },
      {
        // Update documents that match the specified filter
        updateMany: {
          filter: { "location.address.zipcode": "44011" },
          update: { $set: { is_in_ohio: true } },
          upsert: true,
        },
      },
      {
        // Delete a document that matches the specified filter
        deleteOne: { filter: { "location.address.street1": "221b Baker St" } },
      },
    ]);
    // Log the result of the bulk write operation 
    console.log(result);
  } finally {
    // Close the database connection when the operations are completed or if an error occurs
    await client.close();
  }
}
run().catch(console.dir);
