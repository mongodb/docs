db.movies.aggregate([
  {
    $search: {
      "index": "partial-match-tutorial",
      "phrase": {
        "path": "plot",
        "query": "off"
      }
    }
  }
])
