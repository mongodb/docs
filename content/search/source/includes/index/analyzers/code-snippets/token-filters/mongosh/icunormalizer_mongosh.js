db.minutes.createSearchIndex(
  "default",
  {
    "analyzer": "textNormalizer",
    "mappings": {
      "fields": {
        "message": {
          "type": "string",
          "analyzer": "textNormalizer"
        }
      }
    },
    "analyzers": [
      {
        "name": "textNormalizer",
        "charFilters": [],
        "tokenizer": {
          "type": "whitespace"
        },
        "tokenFilters": [
          {
            "type": "icuNormalizer",
            "normalizationForm": "nfkc"
          }
        ]
      }
    ]
  }
)
