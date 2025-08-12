db.minutes.createSearchIndex("default", {
  "analyzer": "stempelStemmer", 
  "mappings": {
    "dynamic": true,
    "fields": {
      "text.pl_PL": {
        "analyzer": "stempelStemmer",
        "searchAnalyzer": "stempelStemmer",
        "type": "string"
      }
    }
  },
  "analyzers": [
    {
      "name": "stempelStemmer",
      "charFilters": [],
      "tokenizer": {
        "type": "standard"
      },
      "tokenFilters": [
        {
          "type": "lowercase"
        },
        {
          "type": "stempel"
        }
      ]
    }
  ]
})
