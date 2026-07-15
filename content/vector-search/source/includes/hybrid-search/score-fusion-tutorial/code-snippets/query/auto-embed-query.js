const { MongoClient } = require("mongodb");

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
        $scoreFusion: {
          input: {
            pipelines: {
              searchOne: [
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
              searchTwo: [
                {
                  "$search": {
                    "index": "hybrid-full-text-search",
                    "text": {
                      "query": "charming animal",
                      "path": "fullplot"
                    }
                  }
                },
                {
                  "$limit": 50
                }
              ]
            },
            normalization: "sigmoid"
          },
          combination: {
            method: "expression",
            expression: {
              $sum: [
                {$multiply: [ "$$searchOne", 10]}, "$$searchTwo"
              ]
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
      { $limit: 10 },
      {
        "$rerank": {
          "model": "rerank-2.5",
          "query": {
            "text": "Movies about charming animals with a fun, adventurous, or comedic tone."
          },
          "path": "fullplot",
          "numDocsToRerank": 50
        }
      },
      {
        "$addFields": {
          "rerankScore": { "$meta": "score" }
        }
      },
      {
        "$limit": 10
      },
      {
        "$project": {
          "_id": 0,
          "title": 1,
          "fullplot": 1,
          "scoreDetails": 1,
          "rerankScore": 1
        }
      }
    ];

    const cursor = movies.aggregate(query);
    await cursor.forEach(doc => console.log(doc));
  } finally {
    await client.close();
  }
}

main().catch(console.error);