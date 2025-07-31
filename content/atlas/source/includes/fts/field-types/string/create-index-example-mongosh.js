db.movies.createSearchIndex(
  {
    "mappings": {
      "dynamic": false,
      "fields": {
        "title": {
          "type": "string"
        }
      }
    }
  }
)