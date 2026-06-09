db.minutes.createSearchIndex("default", {
  "mappings": {
    "fields": {
      "page_updated_by": {
        "fields": {
          "email": {
            "analyzer": "basicEmailAddressAnalyzer",
            "type": "string"
          }
        },
        "type": "document"
      }
    }
  },
  "analyzers": [
    {
      "name": "basicEmailAddressAnalyzer",
      "tokenizer": {
        "type": "uaxUrlEmail"
      }
    }
  ]
})
