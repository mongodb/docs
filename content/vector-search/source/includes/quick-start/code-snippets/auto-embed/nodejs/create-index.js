const { MongoClient } = require("mongodb");
const { setTimeout } = require("timers/promises");

const uri = "<CONNECTION-STRING>";
const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("sample_mflix");
    const collection = database.collection("movies");

    // define your MongoDB Vector Search index
    const index = {
      name: "autoembed_index",
      type: "vectorSearch",
      definition: {
        fields: [
          {
            type: "autoEmbed",
            modality: "text",
            path: "fullplot",
            model: "voyage-4"
          }
        ]
      }
    };

    // run the helper method
    const result = await collection.createSearchIndex(index);
    console.log(`New search index named ${result} is building.`);

    console.log("Polling to check if the index is ready. This may take up to a minute.");
    let isQueryable = false;
    while (!isQueryable) {
      const [indexData] = await collection.listSearchIndexes(index.name).toArray();
      if (indexData) {
        isQueryable = indexData.queryable;
        if (!isQueryable) {
          await setTimeout(5000);
        }
      } else {
        console.log(`Index ${index.name} not found.`);
        await setTimeout(5000);
      }
    }
    console.log(`${result} is ready for querying.`);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
