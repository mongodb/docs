db.movies.aggregate([
  {
    "$vectorSearch": {
      "index": "vector_index",
      "path": "fullplot",
      "query": {
        "text": "solo traveler discovering new cultures"
      },
      "model": "voyage-4",
      "exact": true,
      "limit": 10
    }
  },
  {
    "$project": {
      "_id": 0,
      "fullplot": 1,
      "title": 1,
      "score": { $meta: "vectorSearchScore" }
    }
  }
])