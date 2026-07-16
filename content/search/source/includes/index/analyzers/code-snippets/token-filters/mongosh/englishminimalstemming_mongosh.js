db.minutes.createSearchIndex(
  "default",
  {
    "mappings": {
      "dynamic": true,
      "fields": {
        "text": {
          "fields": {
            "en_US": {
              "analyzer": "minimalStemmer",
              "searchAnalyzer": "minimalStemmer",
              "type": "string"
            }
          },
          "type": "document"
        }
      }
    },
    "analyzers": [
      {
        "name": "minimalStemmer",
        "tokenFilters": [
          {
            "type": "lowercase"
          },
          {
            "type": "englishMinimalStemming"
          }
        ],
        "tokenizer": {
          "type": "standard"
        }
      }
    ]
  }
)
