db.movies.aggregate([
  {
    "$search": {
      "wildcard": {
        "path": "title",
        "query": "*\\?"
      }
    }
  },
  {
    "$limit": 5
  },
  {
    "$project": {
      "_id": 0,
      "title": 1
    }
  }
])
