db.minutes.createSearchIndex(
  "default",
  {
    "mappings": {
      "dynamic": false,
      "fields": {
        "page_updated_by": {
          "type": "document",
          "dynamic": false,
          "fields": {
            "last_name": {
              "type": "string",
              "analyzer": "doubleMetaphoneAnalyzer"
            }
          }
        }
      }
    },
    "analyzers": [
      {
        "name": "doubleMetaphoneAnalyzer",
        "tokenizer": {
          "type": "standard"
        },
        "tokenFilters": [
          {
            "type": "doubleMetaphone",
            "originalTokens": "include"
          }
        ]
      }
    ]
  }
)
