db.minutes.createSearchIndex(
  "default",
  {
    "mappings": {
      "fields": {
        "title": {
          "type": "string",
          "analyzer": "englishPossessiveStemmer"
        }
      }
    },
    "analyzers": [
      {
        "name": "englishPossessiveStemmer",
        "charFilters": [],
        "tokenizer": {
          "type": "standard"
        },
        "tokenFilters": [
          {
            "type": "englishPossessive"
          }
        ]
      }
    ]
  }
)
