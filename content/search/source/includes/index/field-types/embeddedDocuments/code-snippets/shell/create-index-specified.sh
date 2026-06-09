{
  "name": "default",
  "collectionName": "companies",
  "database": "sample_training",
  "type": "search",
  "definition": {
    "mappings": {
      "fields": {
        "offices": {
          "type": "embeddedDocuments",
          "dynamic": false,
          "fields": {
            "country_code": {
              "type": "string"
            },
            "state_code": {
              "type": "string"
            }
          }
        }
      }
    }
  }
}

