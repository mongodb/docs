db.minutes.createSearchIndex(
  "default",
  {
    "mappings": {
      "fields": {
        "text": {
          "type": "document",
          "fields": {
            "en_US": {
              "type": "string",
              "analyzer": "stopwordRemover"
            }
          }
        }
      }
    },
    "analyzers": [
      {
        "name": "stopwordRemover",
        "charFilters": [],
        "tokenizer": {
          "type": "whitespace"
        },
        "tokenFilters": [
          {
            "type": "stopword",
            "tokens": ["is", "the", "at"]
          }
        ]
      }
    ]
  }
)
