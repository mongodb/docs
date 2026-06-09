db.minutes.createSearchIndex(
  "default",
  {
    "mappings": {
      "dynamic": false,
      "fields": {
        "title": {
          "analyzer": "duplicateRemover",
          "type": "string"
        }
      }
    },
    "analyzers": [
      {
        "name": "duplicateRemover",
        "tokenFilters": [
          {
            "type": "keywordRepeat"
          },
          {
            "type": "removeDuplicates"
          }
        ],
        "tokenizer": {
            "type": "whitespace"
        }
      }
    ]
  }
)
