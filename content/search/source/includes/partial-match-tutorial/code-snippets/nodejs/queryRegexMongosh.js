db.movies.aggregate([
  {
    $search: {
      "regex": "partial-match-tutorial",
      "phrase": {
        "path": "plot",
        "query": "off"
      }
    }
  }
])
