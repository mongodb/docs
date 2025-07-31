db.movies.createSearchIndex(
  "default",
  {
    "mappings": { 
      "dynamic": false,
      "fields": {
        "title": {
          "type": "token",
          "normalizer": "lowercase"
        } 
      }
    }
  }
)