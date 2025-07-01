const { MongoClient } = require("mongodb");
const { setTimeout } = require("timers/promises"); // Import from timers/promises

// Connect to your Atlas deployment
const uri = process.env.MONGODB_URI || "<CONNECTION-STRING>";

const client = new MongoClient(uri);

async function main() {
  try {
    const database = client.db("<DB-NAME>");
    const collection = database.collection("<COLLECTION-NAME>");

    // Define your Atlas Vector Search index
    const index = {
      name: "<INDEX-NAME>",
      type: "vectorSearch",
      definition: {
        fields: [
          {
            type: "vector",
            numDimensions: 1024,
            path: "bsonEmbeddings.float32",
            similarity: "dotProduct",
          },
          {
            type: "vector",
            numDimensions: 1024,
            path: "bsonEmbeddings.int8",
            similarity: "dotProduct",
          },
          {
            type: "vector",
            numDimensions: 1024,
            path: "bsonEmbeddings.int1",
            similarity: "euclidean",
          },
        ],
      },
    };

    // Run the helper method
    const result = await collection.createSearchIndex(index);
    console.log(`New search index named ${result} is building.`);

    // Wait for the index to be ready to query
    console.log("Polling to check if the index is ready. This may take up to a minute.");
    let isQueryable = false;

    // Use filtered search for index readiness
    while (!isQueryable) {
      const [indexData] = await collection.listSearchIndexes(index.name).toArray();

      if (indexData) {
        isQueryable = indexData.queryable;
        if (!isQueryable) {
          await setTimeout(5000); // Wait for 5 seconds before checking again
        }
      } else {
        // Handle the case where the index might not be found
        console.log(`Index ${index.name} not found.`);
        await setTimeout(5000); // Wait for 5 seconds before checking again
      }
    }

    console.log(`${result} is ready for querying.`);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("Unhandled error:", err);
});
