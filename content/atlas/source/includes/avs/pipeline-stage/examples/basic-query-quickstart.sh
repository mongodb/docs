db.embedded_movies.aggregate([
  {
    "$vectorSearch": {
      "index": "vector_index",
      "path": "plot_embedding_voyage_3_large",
      "queryVector": QUERY_EMBEDDING,
      "numCandidates": 150
    }
  },
  {
    "$project": {
      "_id": 0,
      "plot": 1,
      "title": 1,
      "score": { $meta: "vectorSearchScore" }
    }
  }
])
