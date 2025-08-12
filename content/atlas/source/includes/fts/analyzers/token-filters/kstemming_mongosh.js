db.minutes.createSearchIndex(
  "default",
  {
    "analyzer": "kStemmer",
    "mappings": {
      "dynamic": true
    },
    "analyzers": [
      {
        "name": "kStemmer",
        "tokenizer": {
          "type": "standard"
        },
        "tokenFilters": [
          {
            "type": "lowercase"
          },
          {
            "type": "kStemming"
          }
        ]
      }
    ]
  }
)
