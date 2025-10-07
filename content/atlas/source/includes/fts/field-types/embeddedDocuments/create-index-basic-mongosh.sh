db.companies.createSearchIndex(
  "default",
  {
    "mappings": { 
      "dynamic": false,
      "fields": {
        "products": {
          "type": "embeddedDocuments",
          "dynamic": true
        }
      }
    }
  }
)