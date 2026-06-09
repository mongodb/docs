db.movies.explain("queryPlanner").aggregate([
  {
    $search: {
      "text": {
        "path": "title",
        "query": "prince"
      },
      "highlight": {
        "path": "title",
        "maxNumPassages": 1,
        "maxCharsToExamine": 40
      }
    }
  },
  {
    $project: {
      "description": 1,
      "_id": 0,
      "highlights": { "$meta": "searchHighlights" }
    }
  }
])