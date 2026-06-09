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
            "first_name": {
              "type": "string",
              "analyzer": "asciiConverter"
            }
          }
        }
      }
    },
    "analyzers": [
      {
        "name": "asciiConverter",
        "tokenizer": {
          "type": "standard"
        },
        "tokenFilters": [
          {
            "type": "asciiFolding"
          }
        ]
      }
    ]
  }
)
