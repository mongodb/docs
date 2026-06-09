db.minutes.createSearchIndex("default", {
  "mappings": {
    "fields": {
      "text": {
        "type": "document",
        "fields": {
          "fr_CA": {
            "type": "string",
            "analyzer": "frenchStemmer"
          }
        }
      }
    }
  },
  "analyzers": [
    {
      "name": "frenchStemmer",
      "charFilters": [],
      "tokenizer": {
        "type": "standard"
      },
      "tokenFilters": [
        {
          "type": "lowercase"
        },
        {
          "type": "snowballStemming",
          "stemmerName": "french"
        }
      ]
    }
  ]
})
