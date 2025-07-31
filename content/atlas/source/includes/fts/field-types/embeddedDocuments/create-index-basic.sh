{
  "name": "default",
  "collectionName": "sales",
  "database": "sample_supplies",
  "type": "search",
  "definition": {
    "mappings": {
      "fields": {
        "items": {
          "type": "embeddedDocuments",
          "dynamic": true
        }
      }
    }
  }
}

