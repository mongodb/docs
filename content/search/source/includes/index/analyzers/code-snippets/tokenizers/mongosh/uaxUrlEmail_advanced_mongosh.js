db.minutes.createSearchIndex("default", {
  "mappings": {
    "fields": {
      "page_updated_by": {
        "fields": {
          "email": {
            "analyzer": "emailAddressAnalyzer",
            "tokenization": "edgeGram",
            "type": "autocomplete"
          }
        },
        "type": "document"
      }
    }
  },
  "analyzers": [
    {
      "name": "emailAddressAnalyzer",
      "tokenizer": {
        "type": "uaxUrlEmail"
      }
    }
  ]
})
