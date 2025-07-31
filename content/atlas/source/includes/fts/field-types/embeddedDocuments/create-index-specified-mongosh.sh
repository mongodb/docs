db.sales.createSearchIndex(
  "default", 
  {
    "mappings": {
      "fields": {
        "items": {
          "type": "embeddedDocuments",
          "dynamic": false,
          "fields": {
            "name": {
              "type": "string"
            },
            "tags": {
              "type": "string"
            }
          }
        }
      }
    }
  }
)
