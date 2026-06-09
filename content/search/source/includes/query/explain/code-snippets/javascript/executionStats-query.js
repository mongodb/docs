db.movies.explain("executionStats").aggregate([
  {
    "$search": {
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
  }
])