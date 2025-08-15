db.movies.aggregate([
  {
    $search: {
      "index": "partial-match-tutorial-autocomplete",
      "autocomplete": {
        "path": "plot",
        "query": "off"
      }
    }
  }
])
