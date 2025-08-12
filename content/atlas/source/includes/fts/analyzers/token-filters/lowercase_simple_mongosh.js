db.minutes.createSearchIndex(
  "default",
  {
    "mappings": {
      "fields": {
        "title": {
          "analyzer": "keywordLowerer",
          "tokenization": "nGram",
          "type": "autocomplete"
        }
      }
    },
    "analyzers": [
      {
        "name": "keywordLowerer",
        "charFilters": [],
        "tokenizer": {
          "type": "keyword"
        },
        "tokenFilters": [
          {
            "type": "lowercase"
          }
        ]
      }
    ]
  }
)
