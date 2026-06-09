db.minutes.createSearchIndex(
  "default",
  {
    "mappings": {
      "dynamic": false,
      "fields": {
        "title": {
          "analyzer": "keywordStemRemover",
          "type": "string"
        }
      }
    },
    "analyzers": [
      {
        "name": "keywordStemRemover",
        "tokenFilters": [
          {
            "type": "keywordRepeat"
          },
          {
            "type": "porterStemming"
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
