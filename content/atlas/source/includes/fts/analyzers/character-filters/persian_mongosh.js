db.minutes.createSearchIndex("default", {
  "analyzer": "lucene.standard",
  "mappings": {
    "fields": {
      "text": {
        "dynamic": true,
        "fields": {
          "fa_IR": {
            "analyzer": "persianCharacterIndex",
            "type": "string"
          }
        },
        "type": "document"
      }
    }
  },
  "analyzers": [
    {
      "name": "persianCharacterIndex",
      "charFilters": [
        {
          "type": "persian"
        }
      ],
      "tokenizer": {
        "type": "whitespace"
      }
    }
  ]
})
