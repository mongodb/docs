db.movies.aggregate([
  {
    "$search": {
      "index": "autocomplete-tutorial",
      "compound": {
        "should": [{
          "autocomplete": {
            "query": "pri",
            "path": "title"
          }
        },
        {
          "autocomplete": {
            "query": "pri",
            "path": "plot"
          }
        }],
        "minimumShouldMatch": 1
      }
    }
  },
  {
    "$limit": 5
  },
  {
    "$project": {
      "_id": 0,
      "title": 1,
      "plot": 1
    }
  }
])
