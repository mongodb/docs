{
  "name": "default",
  "collectionName": "companies",
  "database": "sample_training",
  "type": "search",
  "definition": {
    "mappings": {
      "fields": {
        "products": {
          "type": "embeddedDocuments",
          "dynamic": true
        }
      }
    }
  }
}