db.minutes.createSearchIndex("default", {
  "analyzer": "keywordReverse",
  "mappings": {
    "dynamic": true
  },
  "analyzers": [
    {
      "name": "keywordReverse",
      "charFilters": [],
      "tokenizer": {
        "type": "keyword"
      },
      "tokenFilters": [
        {
          "type": "reverse"
        }
      ]
    }
  ]
})
