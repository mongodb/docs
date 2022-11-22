db.movies.aggregate([{ 
  $search: { 
    compound: {
      "should": [{
        "wildcard": {
          "query": ["Prance*"],
          "path": "title",
          "score": {
            "constant": {
              "value": 99
            }
          },
          "allowAnalyzedField": true
        }
      },
      {
        "wildcard": {
          "query": ["Prince*"],
          "path": "title",
          "score": {
            "constant": {
              "value": 95
          }}
        }
      }]
    },
    "returnStoredSource": true
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
