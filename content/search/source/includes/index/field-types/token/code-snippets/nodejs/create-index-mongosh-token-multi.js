db.movies.createSearchIndex(
  "default",
  {
    "mappings": { 
      "dynamic": false,
      "fields": {
        "genres": [
          {
            "type": "string"
          },
          {
            "type": "token"
          }
        ]
      }
    }
  }
)