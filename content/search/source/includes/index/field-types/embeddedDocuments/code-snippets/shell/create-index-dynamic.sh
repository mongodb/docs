
{
  "name": "default",
  "collectionName": "companies",
  "database": "sample_training",
  "type": "search",
  "definition": {
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
}

