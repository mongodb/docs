const { MongoClient } = require("mongodb");

async function main() {
  // Replace the placeholder with your connection string
  const uri = "<connection-string>";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("sample_mflix");
    const collection = database.collection("movies");

    const pipeline = [
      {
        "$vectorSearch": {
          "index": "autoembed_index",
          "path": "fullplot",
          "query": {
            "text": "journey through the country side"
          },
          "numCandidates": 100,
          "limit": 10
        }
      },
      {
        "$project": {
          "_id": 0,
          "title": 1,
          "fullplot": 1,
          "score": { "$meta": "vectorSearchScore" }
        }
      }
    ];

    const cursor = collection.aggregate(pipeline);
    await cursor.forEach(doc => console.log(doc));
  } finally {
    await client.close();
  }
}

main().catch(console.error);
