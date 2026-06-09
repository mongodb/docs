db.movies.createSearchIndex(
  "default", 
  {
    "mappings": {
      "dynamic": false,
      "fields": {
        "title": {
          "type": "autocomplete",
          "analyzer": "lucene.standard",
          "tokenization": "edgeGram",
          "minGrams": 3,
          "maxGrams": 5,
          "foldDiacritics": false,
          "similarity": { "type": "stableTfl" }
        }
      }
    }
  }
)