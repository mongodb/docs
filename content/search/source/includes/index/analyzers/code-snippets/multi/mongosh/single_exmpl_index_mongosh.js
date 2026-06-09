db.movies.createSearchIndex(
  "default",
    {
      "mappings": {
        "dynamic": false,
        "fields": {
          "title": {
            "type": "string",
            "analyzer": "lucene.standard",
            "multi": {
              "frenchAnalyzer": {
                "type": "string",
                "analyzer": "lucene.french"
              }
          }
        }
      }
    }
  }
)