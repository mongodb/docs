db.movies.aggregate([ 
  { 
    $search: {
      "index": "multilingual-tutorial",
      "compound": {
        "must": [{ 
          "text": {
             "query": "Bella",
             "path": { "value": "fullplot", "multi": "fullplot_english" }
          }
        }], 
        "mustNot": [{ 
          "range": { 
            "path": "released", 
            "gt": ISODate("1984-01-01T00:00:00.000Z"), 
            "lt": ISODate("2016-01-01T00:00:00.000Z") 
          } 
        }], 
        "should": [{ 
          "text": { 
            "query": "Comedy",
            "path": "genres"
          } 
        }] 
      }
    }
  }, 
  { 
    $project: { 
      "_id": 0, 
      "title": 1, 
      "fullplot": 1, 
      "released": 1, 
      "genres": 1, 
      "score": { 
        "$meta": "searchScore" 
      } 
    } 
  }
])
