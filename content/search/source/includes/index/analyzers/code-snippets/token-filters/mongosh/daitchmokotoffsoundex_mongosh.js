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
              "analyzer": "dmsAnalyzer"
            }
          }
        }
      }
    },
    "analyzers": [
      {
        "name": "dmsAnalyzer",
        "tokenizer": {
          "type": "standard"
        },
        "tokenFilters": [
          {
            "type": "daitchMokotoffSoundex",
            "originalTokens": "include"
          }
        ]
      }
    ]
  }
)
