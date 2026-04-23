const { MongoClient } = require("mongodb");

async function main() {
  // Replace the placeholder with your connection string
  const uri = "<connection-string>";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("sample_airbnb");
    const movies = database.collection("listingsAndReviews");

    const query = [
      {
        "$vectorSearch": {
        "index": "vector_index",
        "path": "summary",
        "filter": {
          "bedrooms": {  "$gte": 3  },
          "address.country": { '$in': ['United States'] } 
        },
        "query": {
          "text": "close to amusement parks"
        },
        "model": "voyage-4",
        "numCandidates": 100,
        "limit": 10
        }
      },
      {
        "$project": {
          "_id": 0,
          "name": 1,
          "summary": 1,
          "address": 1,
          "price": 1,
          "bedrooms": 1,
          "score": { $meta: "vectorSearchScore" }
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
