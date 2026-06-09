db.movies.aggregate([
  {
    $search: {
      "autocomplete": {
        "path": "title",
        "query": ["ger"]
      },
      "highlight": { 
        "path": "title"
      }
    }
  },
  {
    $limit: 5
  }, 
  { 
    $project: {
        
      "score": { $meta: "searchScore" },
      "title": 1,
      "_id": 0,
      "highlights": { "$meta": "searchHighlights" }
    }
  }
])
