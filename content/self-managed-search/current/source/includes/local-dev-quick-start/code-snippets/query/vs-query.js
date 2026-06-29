db.embedded_movies.aggregate([
  {
    "$vectorSearch": {
      "index": "movie-vector-index",
      "path": "plot_embedding_voyage_4_large",
      "queryVector": QUERY_EMBEDDING,
      "numCandidates": 100,
      "limit": 3
    }
  },
  {
    "$project": {
      "_id": 0,
      "title": 1,
      "plot": 1,
      "score": { $meta: "vectorSearchScore" }
    }
  }
])