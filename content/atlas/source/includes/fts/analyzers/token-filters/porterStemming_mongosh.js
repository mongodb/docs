db.minutes.createSearchIndex("default", {
  "mappings": {
    "fields": {
      "title": {
        "type": "string",
        "analyzer": "porterStemmer"
      }
    }
  },
  "analyzers": [
    {
      "name": "porterStemmer",
      "tokenizer": {
        "type": "standard"
      },
      "tokenFilters": [
        {
          "type": "lowercase"
        },
        {
          "type": "porterStemming"
        }
      ]
    }
  ]
})
