db.minutes.createSearchIndex("default", {
  "analyzer": "lucene.standard",
  "mappings": {
    "dynamic": false,
    "fields": {
      "page_updated_by": {
        "type": "document",
        "fields": {
          "email": {
            "type": "string",
            "analyzer": "emailRedact"
          }
        }
      }
    }
  },
  "analyzers": [
    {
      "charFilters": [],
      "name": "emailRedact",
      "tokenizer": {
        "type": "keyword"
      },
      "tokenFilters": [
        {
          "type": "lowercase"
        },
        {
          "matches": "all",
          "pattern": "^([a-z0-9_\\.-]+)@([\\da-z\\.-]+)\\.([a-z\\.]{2,5})$",
          "replacement": "redacted",
          "type": "regex"
        }
      ]
    }
  ]
})
