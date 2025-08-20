db.movies.createSearchIndex(
  "default",
    {
      "mappings": {
        "fields": {
          "title": {
            "type": "string",
            "analyzer": "lucene.keyword"
          }
        }
      }
    }
)