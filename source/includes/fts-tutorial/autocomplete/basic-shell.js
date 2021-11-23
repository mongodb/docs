db.movies.aggregate([
  {
    $search: {
      "autocomplete": {
        "path": "title",
        "query": "off"
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
