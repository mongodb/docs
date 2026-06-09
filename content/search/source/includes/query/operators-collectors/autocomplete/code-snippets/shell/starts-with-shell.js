db.movies.aggregate([
  {
    $search: {
      "autocomplete": {
        "query": "Fast &",
        "path": "title",
        "tokenOrder": "sequential" 
      }
    }
  },
  {
    $project: {
      "_id": 0,
      "title": 1
    }
  },
  {
    $limit: 4
  }
])
  