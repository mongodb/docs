db.minutes.createSearchIndex(
  "default",
  {
    "mappings": {
      "dynamic": true,
      "fields": {
        "message": {
          "analyzer": "keywordExample",
          "type": "string"
        }
      }
    },
    "analyzers": [
      {
        "charFilters": [],
        "name": "keywordExample",
        "tokenFilters": [],
        "tokenizer": {
          "type": "keyword"
        }
      }
    ]
  }
)
