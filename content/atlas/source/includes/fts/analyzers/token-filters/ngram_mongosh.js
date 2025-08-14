db.minutes.createSearchIndex(
  "default",
  {
    "mappings": {
      "fields": {
        "title": {
          "type": "string",
          "analyzer": "titleAutocomplete",
          "searchAnalyzer": "lucene.keyword"
        }
      }
    },
    "analyzers": [
      {
        "name": "titleAutocomplete",
        "charFilters": [],
        "tokenizer": {
          "type": "standard"
        },
        "tokenFilters": [
          {
            "type": "englishPossessive"
          },
          {
            "type": "nGram",
            "minGram": 4,
            "maxGram": 7
          }
        ]
      }
    ]
  }
)
