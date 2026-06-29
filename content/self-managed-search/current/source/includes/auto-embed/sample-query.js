db.movies.aggregate([
  {
    "$vectorSearch": {
      "index": "movie-semantic-index",
      "path":  "plot",
      "query": "a heist gone wrong in a rainy city",
      "model": "voyage-4",
      "numCandidates": 100,
      "limit": 10
    }
  },
  {
    "$project": {
      "_id":   0,
      "title": 1,
      "score": { $meta: "vectorSearchScore" }
    }
  }
])