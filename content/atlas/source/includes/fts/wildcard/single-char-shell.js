db.movies.aggregate([
  {
    "$search": {
      "wildcard": {
        "path": "title",
        "query": "Green D*"
      }
    }
  },
  {
    "$project": {
      "_id": 0,
      "title": 1
    }
  }
])
