const { MongoClient } = require("mongodb");
const { setTimeout } = require("timers/promises");

// Connect to your MongoDB cluster
const uri = process.env.MONGODB_URI || "<CONNECTION-STRING>";

const client = new MongoClient(uri);

async function main() {
  try {
    const DB_NAME = "sample_mflix";
    const COLLECTION_NAME = "embedded_movies";
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    // define your MongoDB Vector Search index
    const index = {
      name: "multiple-vector-search",
      type: "vectorSearch",
      definition: {
        fields: [
          {
            type: "vector",
            numDimensions: 1536,
            path: "plot_embedding",
            similarity: "dotProduct",
          },
          {
            type: "vector",
            numDimensions: 2048,
            path: "plot_embedding_voyage_4_large",
            similarity: "dotProduct",
          },
          {
            type: "vector",
            numDimensions: 2048,
            path: "title_embedding_voyage_4_large",
            similarity: "dotProduct",
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