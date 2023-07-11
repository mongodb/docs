db.movies.aggregate([
  {
    $search: {
      "compound": {
        "should": [
          {
            "autocomplete": {
              "query": "inter",
              "path": "title",
            },
          },
          {
            "text": {
              "query": "inter",
              "path": "plot",
            }
          }
        ],
        "minimumShouldMatch": 1
      },
    },
  },
  {
    $limit: 10,
  },
  {
    $project: 
      {
        "_id": 0,
        "title": 1,
        "plot": 1
      },
  },
])
