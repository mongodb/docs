db.minutes.createSearchIndex(
  "default",
  {
    "mappings": {
      "fields": {
        "message": {
          "type": "string",
          "analyzer": "wordDelimiterGraphFlatten"
        }
      }
    },
    "analyzers": [
      {
        "name": "wordDelimiterGraphFlatten",
        "charFilters": [],
        "tokenizer": {
          "type": "whitespace"
        },
        "tokenFilters": [
          {
            "type": "wordDelimiterGraph",
            "delimiterOptions": {
              "generateWordParts": true,
              "preserveOriginal": true
            },
            "protectedWords": {
              "words": [
                "SIGN_IN"
              ],
              "ignoreCase": false
            }
          },
          {
            "type": "flattenGraph"
          }
        ]
      }
    ]
  }
)
