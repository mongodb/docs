db.movies.aggregate([
  {
    "$search": {
      "index": "movie-index",
      "text": {
        "query": "courtroom lawyer",
        "path": "plot",
        "fuzzy": {}
      }
    }
  },
  {
        "$limit": 3
  },
  {
    "$project": {
      "_id": 0,
      "title": 1,
      "plot": 1
    }
  }
])