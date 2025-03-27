db.movies.aggregate([{ 
  $search: { 
    "index": "sort-tutorial",
    "compound": {
      "should": [{
        "wildcard": {
          "query": ["Prance*"],
          "path": "title",
          "allowAnalyzedField": true
        }
      },
      {
        "wildcard": {
          "query": ["Prince*"],
          "path": "title",
          "allowAnalyzedField": true
        }
      }]
    },
    "sort": {
      "title": 1
    }
  }},
  { 
    $limit: 5
  },
  {
    $project: {
      "_id": 0,
      "title": 1,
      "score": { "$meta": "searchScore" }
    }
  }
])
