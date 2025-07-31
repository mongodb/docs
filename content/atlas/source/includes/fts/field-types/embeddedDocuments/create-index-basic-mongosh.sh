db.sales.createSearchIndex(
  "default",
  {
    "mappings": { 
      "dynamic": false,
      "fields": {
        "items": {
          "type": "embeddedDocuments",
          "dynamic": true
        }
      }
    }
  }
)