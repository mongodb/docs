db.minutes.createSearchIndex("default", {
  "mappings": {
    "fields": {
      "message": {
        "type": "string",
        "analyzer": "normalizingAnalyzer"
      }
    }
  },
  "analyzers": [
    {
      "name": "normalizingAnalyzer",
      "charFilters": [
        {
          "type": "icuNormalize"
        }
      ],
      "tokenizer": {
        "type": "whitespace"
      },
      "tokenFilters": []
    }
  ]
})
