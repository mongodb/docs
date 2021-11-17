db.movies.aggregate([
  {
    "$search": {
      "wildcard": {
        "path": "title",
        "query": "Wom?n *"
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
