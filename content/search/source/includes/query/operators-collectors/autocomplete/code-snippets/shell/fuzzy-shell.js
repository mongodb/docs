db.movies.aggregate([
  {
    $search: {
      "autocomplete": {
        "path": "title",
        "query": "pre",
        "fuzzy": {
          "maxEdits": 1,
          "prefixLength": 1,
          "maxExpansions": 256
        }
      }
    }
  },
  {
    $limit: 10
  },
  {
    $project: {
      "_id": 0,
      "title": 1
    }
  }
])
