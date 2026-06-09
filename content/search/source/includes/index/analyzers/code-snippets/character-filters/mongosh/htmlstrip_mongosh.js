db.minutes.createSearchIndex(
  "default",
  {
    "mappings": {
      "fields": {
        "text": {
          "type": "document",
          "dynamic": true,
          "fields": {
            "en_US": {
              "analyzer": "htmlStrippingAnalyzer",
              "type": "string"
            }
          }
        }
      }
    },
    "analyzers": [
      {
        "name": "htmlStrippingAnalyzer",
        "charFilters": [
          {
            "type": "htmlStrip",
            "ignoredTags": ["a"]
          }
        ],
        "tokenizer": {
          "type": "standard"
        },
        "tokenFilters": []
      }
    ]
  }
)
