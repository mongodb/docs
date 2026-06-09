db.movies.explain("allPlansExecution").aggregate([
  {
    $search: {
      "text": {
        "path": "title",
        "query": "yark",
        "fuzzy": {
          "maxEdits": 1,
          "maxExpansions": 100,
        }
      }
    }
  }
])