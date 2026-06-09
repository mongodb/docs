db.minutes.createSearchIndex(
  "default",
  {
    "mappings": {
      "fields": {
        "text": {
          "type": "document",
          "dynamic": true,
          "fields": {
            "sv_FI": {
              "type": "string",
              "analyzer": "longOnly"
            }
          }
        }
      }
    },
    "analyzers": [
      {
        "name": "longOnly",
        "charFilters": [],
        "tokenizer": {
          "type": "standard"
        },
        "tokenFilters": [
          {
            "type": "icuFolding"
          },
          {
            "type": "length",
            "min": 20
          }
        ]
      }
    ]
  }
)
