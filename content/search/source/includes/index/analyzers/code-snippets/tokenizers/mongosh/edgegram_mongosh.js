db.minutes.createSearchIndex(
  "default",
  {
    "mappings": {
      "dynamic": true,
      "fields": {
        "message": {
          "analyzer": "edgegramExample",
          "type": "string"
        }
      }
    },
    "analyzers": [
      {
        "charFilters": [],
        "name": "edgegramExample",
        "tokenFilters": [],
        "tokenizer": {
          "maxGram": 7,
          "minGram": 2,
          "type": "edgeGram"
        }
      }
    ]
  }
)
