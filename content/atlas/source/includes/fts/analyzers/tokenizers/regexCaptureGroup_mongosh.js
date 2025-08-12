db.minutes.createSearchIndex("default", {
  "mappings": {
    "dynamic": true,
    "fields": {
      "page_updated_by": {
        "fields": {
          "phone": {
            "analyzer": "phoneNumberExtractor",
            "type": "string"
          }
        },
        "type": "document"
      }
    }
  },
  "analyzers": [
    {
      "charFilters": [
        {
          "mappings": {
            " ": "-",
            "(": "",
            ")": "",
            ".": "-"
          },
          "type": "mapping"
        }
      ],
      "name": "phoneNumberExtractor",
      "tokenFilters": [],
      "tokenizer": {
        "group": 0,
        "pattern": "^\\b\\d{3}[-]?\\d{3}[-]?\\d{4}\\b$",
        "type": "regexCaptureGroup"
        }
    }
  ]
})
