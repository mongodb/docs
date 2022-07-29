db.movies.aggregate([
  {
    "$search" : {
      "compound" : {
        "must": [{
            "wildcard" : {
              "query" : "alle*",
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
