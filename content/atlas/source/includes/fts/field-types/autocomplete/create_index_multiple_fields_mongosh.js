db.movies.createSearchIndex(
  "default", 
  {
    "mappings": {
      "dynamic": false,
      "fields": {
        "title": [
          {
            "type": "autocomplete",
            "analyzer": "lucene.standard",
            "tokenization": "edgeGram",
            "minGrams": 2,
            "maxGrams": 15,
            "foldDiacritics": false
          },
          {
            "type": "string"
          }
        ]
      }
    }
  }
)