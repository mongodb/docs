db.movies.aggregate([
  {
    "$search" : {
      "index": "diacritic-insensitive-tutorial",
      "compound" : {
        "must": [{
            "wildcard" : {
              "query" : "allè*",
              "path": "title",
              "allowAnalyzedField": true
         }
        }],
        "should": [{
          "text": {
            "query" : "Drama",
            "path" : "genres"
          }
        }]
      }
    }
  },
  {
    "$project" : {
      "_id" : 0,
      "title" : 1,
      "genres" : 1,
      "score" : { "$meta": "searchScore" }
    }
  }
])
