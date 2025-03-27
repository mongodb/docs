db.movies.aggregate([ 
  { 
    $search: {
      "index": "multilingual-tutorial",
      "compound": {
        "must": [{ 
          "text": { 
            "path": "fullplot", 
            "query":  "coppia"
          }
        }], 
        "mustNot": [{ 
          "range": { 
            "path": "released", 
            "gt": ISODate("2000-01-01T00:00:00.000Z"), 
            "lt": ISODate("2009-01-01T00:00:00.000Z") 
          } 
        }], 
        "should": [{ 
          "text": { 
            "query": "Drama", 
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