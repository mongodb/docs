db.minutes.createSearchIndex("default", {
  "analyzer": "spanishPluralStemmer", 
  "mappings": {
    "fields": {
      "text": { 
        "type": "document",
        "fields": {
          "es_MX": {
            "analyzer": "spanishPluralStemmer",
            "searchAnalyzer": "spanishPluralStemmer",
            "type": "string"
          }
        }
      }
    }
  },
  "analyzers": [
    {
      "name": "spanishPluralStemmer",
      "charFilters": [],
      "tokenizer": {
        "type": "standard"
      },
      "tokenFilters": [
        {
          "type": "lowercase"
        },
        {
          "type": "spanishPluralStemming"
        }
      ]
    }
  ]
})
