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

    // define your MongoDB Vector Search indexes
    const autoEmbedIndex = {
      name: "multiple-auto-embed-search",
      type: "vectorSearch",
      definition: {
        fields: [
          {
            type: "autoEmbed",
            modality: "text",
            path: "fullplot",
            model: "voyage-4",
            numDimensions: 2048,
          },
          {
            type: "autoEmbed",
            modality: "text",
            path: "title",
            model: "voyage-4",
            numDimensions: 2048,
          },
        ],
      },
    };

    const vectorIndex = {
      name: "multiple-models-search",
      type: "vectorSearch",
      definition: {
        fields: [
          {
            type: "vector",
            numDimensions: 1536,
            path: "plot_embedding",
            similarity: "dotProduct",
          },
        ],
      },
    };

    // Run the helper method to create both indexes
    const autoEmbedResult = await collection.createSearchIndex(autoEmbedIndex);
    console.log(`New search index named ${autoEmbedResult} is building.`);

    const vectorResult = await collection.createSearchIndex(vectorIndex);
    console.log(`New search index named ${vectorResult} is building.`);

    // Wait for the indexes to be ready to query
    console.log("Polling to check if the indexes are ready. This may take up to a minute.");

    // Use filtered search for index readiness
    for (const indexName of [autoEmbedResult, vectorResult]) {
      let isQueryable = false;

      while (!isQueryable) {
        const [indexData] = await collection.listSearchIndexes(indexName).toArray();

        if (indexData) {
          isQueryable = indexData.queryable;
          if (!isQueryable) {
            await setTimeout(5000); // Wait for 5 seconds before checking again
          }
        } else {
          // Handle the case where the index might not be found
          console.log(`Index ${indexName} not found.`);
          await setTimeout(5000); // Wait for 5 seconds before checking again
        }
      }

      console.log(`${indexName} is ready for querying.`);
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("Unhandled error:", err);
});
