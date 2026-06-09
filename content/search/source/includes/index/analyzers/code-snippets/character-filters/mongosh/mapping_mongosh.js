db.minutes.createSearchIndex(
  "default",
  {
    "mappings": {
      "fields": {
        "page_updated_by": {
          "fields": {
            "phone": {
              "analyzer": "mappingAnalyzer",
              "type": "string"
            }
          },
          "type": "document"
        }
      }
    },
    "analyzers": [
      {
        "name": "mappingAnalyzer",
        "charFilters": [
          {
            "mappings": {
              "-": "",
              ".": "",
              "(": "",
              ")": "",
              " ": ""
            },
            "type": "mapping"
          }
        ],
        "tokenizer": {
          "type": "keyword"
        }
      }
    ]
  }
)
