db.minutes.createSearchIndex("default", {
  "mappings": {
    "fields": {
      "text": {
        "type": "document",
        "fields": {
          "en_US": {
            "type": "string",
            "analyzer": "tokenTrimmer" 
          }
        }
      }
    }
  },
  "analyzers": [
    {
      "name": "tokenTrimmer",
      "charFilters": [{
        "type": "htmlStrip",
        "ignoredTags": ["a"]
      }],
      "tokenizer": {
        "type": "keyword"
      },
      "tokenFilters": [
        {
          "type": "trim"
        }
      ]
    }
  ]
})
