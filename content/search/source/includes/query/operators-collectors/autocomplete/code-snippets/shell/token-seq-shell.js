db.movies.aggregate([
  {
    $search: {
      "autocomplete": {
        "path": "title",
        "query": "men with",
        "tokenOrder": "sequential"
      }
    }
  },
  {
    $limit: 4
  },
  {
    $project: {
      "_id": 0,
      "title": 1
    }
  }
])
