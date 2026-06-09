db.minutes.createSearchIndex("default", {
  "mappings": {
    "fields": {
      "title": {
        "type": "string",
        "analyzer": "wordDelimiterGraphAnalyzer"
      }
    }
  },
  "analyzers": [
    {
      "name": "wordDelimiterGraphAnalyzer",
      "charFilters": [],
      "tokenizer": {
        "type": "whitespace"
      },
      "tokenFilters": [
        {
          "type": "wordDelimiterGraph",
          "protectedWords": {
            "words": ["is", "the", "at"],
            "ignoreCase": false
          },
          "delimiterOptions" : {
            "generateWordParts" : false,
            "splitOnCaseChange" : true
          }
        }
      ]
    }
  ]
})
