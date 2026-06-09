db.minutes.createSearchIndex("default", {
  "mappings": {
    "dynamic": true,
    "fields": {
      "page_updated_by": {
        "fields": {
          "phone": {
            "analyzer": "dashDotSpaceSplitter",
            "type": "string"
          }
        },
        "type": "document"
      }
    }
  },
  "analyzers": [
    {
      "charFilters": [],
      "name": "dashDotSpaceSplitter",
      "tokenFilters": [],
      "tokenizer": {
        "pattern": "[-. ]+",
        "type": "regexSplit"
      }
    }
  ]
})
