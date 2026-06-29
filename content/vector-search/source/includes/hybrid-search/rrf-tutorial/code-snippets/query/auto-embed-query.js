const { MongoClient } = require("mongodb");
const { inspect } = require("util");

async function main() {
  // Replace the placeholder with your connection string
  const uri = "<connection-string>";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("sample_mflix");
    const movies = database.collection("embedded_movies");

    const query = [
      {
        $rankFusion: {
          input: {
            pipelines: {
              vectorPipeline: [
                {
                  "$vectorSearch": {
                    "index": "hybrid-vector-search",
                    "path": "fullplot",
                    "query": {
                      "text": "charming animal"
                    },
                    "numCandidates": 500,
                    "limit": 50
                  }
                }
              ],
              fullTextPipeline: [
                {
                  "$search": {
                    "index": "hybrid-full-text-search",
                    "text": {
                      "query": "charming animal",
                      "path": "fullplot",
                      "fuzzy": {}
                    }
                  }
                },
                { "$limit": 50 }
              ]
            }
          },
          combination: {
            weights: {
              vectorPipeline: 0.5,
              fullTextPipeline: 0.5
            }
          },
          "scoreDetails": true
        }
      },
      {
        "$project": {
          _id: 1,
          title: 1,
          fullplot: 1,
          scoreDetails: {"$meta": "scoreDetails"}
        }
      },
      {
        "$limit": 10
      },
    ];

    const cursor = movies.aggregate(query);
    await cursor.forEach(doc =>
      console.log(inspect(doc, { depth: null, colors: true, maxArrayLength: null }))
    );
  } finally {
    await client.close();
  }
}

main().catch(console.error);
