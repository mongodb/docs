db.minutes.createSearchIndex(
  "default",
  {
    "analyzer": "titleAutocomplete",
    "mappings": {
      "dynamic": false,
      "fields": {
        "title": {
          "type": "string",
          "analyzer": "titleAutocomplete"
        }
      }
    },
    "analyzers": [
      {
        "name": "titleAutocomplete",
        "charFilters": [],
        "tokenizer": {
          "type": "standard"
        },
        "tokenFilters": [
          {
            "type": "icuFolding"
          },
          {
            "type": "edgeGram",
            "minGram": 4,
            "maxGram": 7
          }
        ]
      }
    ]
  }
)
