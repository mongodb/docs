db.minutes.createSearchIndex("default", {
  "mappings": {
    "dynamic": true,
    "fields": {
      "message": {
        "analyzer": "whitespaceExample",
        "type": "string"
      }
    }
  },
  "analyzers": [
    {
      "charFilters": [],
      "name": "whitespaceExample",
      "tokenFilters": [],
      "tokenizer": {
        "type": "whitespace"
      }
    }
  ]
})
