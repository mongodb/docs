db.movies.aggregate([
  {
    $search: {
      "index": "autocomplete-tutorial",
      "autocomplete": {
        "path": "title",
        "query": "ger"
      }
    }
  },
  {
    $limit: 20
  },
  {
    $project: {
      "_id": 0,
      "title": 1
    }
  }
])
