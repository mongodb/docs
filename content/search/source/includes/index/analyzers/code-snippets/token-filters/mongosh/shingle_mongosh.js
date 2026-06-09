db.minutes.createSearchIndex("default", {
  "analyzer": "lucene.keyword",
  "mappings": {
    "dynamic": true,
    "fields": {
      "page_updated_by": {
        "type": "document",
        "fields": {
          "email": {
            "type": "string",
            "analyzer": "emailAutocompleteIndex",
            "searchAnalyzer": "emailAutocompleteSearch"
          }
        }
      }
    }
  },
  "analyzers": [
    {
      "name": "emailAutocompleteIndex",
      "charFilters": [
        {
          "mappings": {
            "@": "AT"
          },
          "type": "mapping"
        }
      ],
      "tokenizer": {
        "maxTokenLength": 15,
        "type": "whitespace"
      },
      "tokenFilters": [
        {
          "maxShingleSize": 3,
          "minShingleSize": 2,
          "type": "shingle"
        },
        {
          "maxGram": 15,
          "minGram": 2,
          "type": "edgeGram"
        }
      ]
    },
    {
      "name": "emailAutocompleteSearch",
      "charFilters": [
        {
          "mappings": {
            "@": "AT"
          },
          "type": "mapping"
        }
      ],
      "tokenizer": {
        "maxTokenLength": 15,
        "type": "whitespace"
      }
    }
  ]
})
