db.minutes.createSearchIndex(
  "default",
  {
    "analyzer": "diacriticFolder",
    "mappings": {
      "fields": {
        "text": {
          "type": "document",
          "fields": {
            "sv_FI": {
              "analyzer": "diacriticFolder",
              "type": "string"
            }
          }
        }
      }
    },
    "analyzers": [
      {
        "name": "diacriticFolder",
        "charFilters": [],
        "tokenizer": {
          "type": "keyword"
        },
        "tokenFilters": [
          {
            "type": "icuFolding"
          }
        ]
      }
    ]
  }
)
