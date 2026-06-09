db.users.createSearchIndex(
  "default", 
  {
    "mappings": {
      "dynamic": true,
      "fields": {
        "email": {
          "type": "autocomplete",
          "analyzer": "lucene.keyword",
          "tokenization": "nGram",
          "minGrams": 3,
          "maxGrams": 15,
          "foldDiacritics": false
        }
      }
    }
  }
)