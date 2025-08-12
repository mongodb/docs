db.minutes.createSearchIndex(
  "default",
  {
    "mappings": {
      "fields": {
        "message": {
          "type": "string",
          "analyzer": "lowerCaser"
        }
      }
    },
    "analyzers": [
      {
        "name": "lowerCaser",
        "charFilters": [],
        "tokenizer": {
          "type": "standard"
        },
        "tokenFilters": [
          {
            "type": "icuNormalizer",
            "normalizationForm": "nfkd"
          },
          {
            "type": "lowercase"
          }
        ]
      }
    ]
  }
)
