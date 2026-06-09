db.companies.createSearchIndex(
  "default", 
  {
    "mappings": {
      "dynamic": true,
      "fields": {
        "products": {
          "dynamic": true,
          "type": "embeddedDocuments"
        },
        "category_code": {
          "type": "token"
        }
      }
    }
  }
)