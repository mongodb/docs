db.movies.aggregate([
  {
    $search: {
      "index": "partial-match-tutorial",
      "wildcard": {
        "path": "plot",
        "query": "how*"
      }
    }
  }
])
