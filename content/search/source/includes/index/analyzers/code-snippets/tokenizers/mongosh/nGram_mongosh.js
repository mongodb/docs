db.minutes.createSearchIndex("default", {
  "mappings": {
    "dynamic": true,
    "fields": {
      "title": {
        "analyzer": "ngramExample",
        "type": "string"
      }
    }
  },
  "analyzers": [
    {
      "charFilters": [],
      "name": "ngramExample",
      "tokenFilters": [],
      "tokenizer": {
        "maxGram": 6,
        "minGram": 4,
        "type": "nGram"
      }
    }
  ]
})
