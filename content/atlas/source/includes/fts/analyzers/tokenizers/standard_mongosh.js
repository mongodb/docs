db.minutes.createSearchIndex(
  "default",
  {
    "mappings": {
      "dynamic": true,
      "fields": {
        "message": {
          "analyzer": "standardExample",
          "type": "string"
        }
      }
    },
    "analyzers": [
      {
        "charFilters": [],
        "name": "standardExample",
        "tokenFilters": [],
        "tokenizer": {
          "type": "standard"
        }
      }
    ]
  }
)
