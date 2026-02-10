import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "<connection string uri>";

const client = new MongoClient(uri);

interface Address {
  street1: string;
  city: string;
  state: string;
  zipcode: string;
}

interface Theater {
  location: { address: Address };
  is_in_ohio?: boolean;
}

async function run() {
  try {
    const database = client.db("sample_mflix");
    const theaters = database.collection<Theater>("theaters");

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
        updateMany: {
          // Important: You lose type safety when you use dot notation in queries
          filter: { "location.address.zipcode": "44011" },
          update: { $set: { is_in_ohio: true } },
          upsert: true,
        },
      },
      {
        deleteOne: {
          filter: { "location.address.street1": "221b Baker St" },
        },
      },
    ]);

    console.log(result);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
