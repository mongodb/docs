db.embedded_movies.aggregate([
  {
    "$vectorSearch": {
      "index": "vector_index",
      "path": "plot_embedding_voyage_3_large",
      "filter": {
        "$or": [{
          "genres": { "$ne": "Crime" }
        }, {
          "$and": [{
            "year": { "$lte": 2015 }
          }, {
            "genres": { "$eq": "Action" }
          }]
        }]
      },
      "queryVector": STAR_WARS_EMBEDDING,
      "numCandidates": 200,
      "limit": 10
    }
  },
  {
    "$project": {
      "_id": 0,
      "title": 1,
      "genres": 1,
      "plot": 1,
      "released": 1,
      "score": { $meta: "vectorSearchScore" }
    }
  }
])