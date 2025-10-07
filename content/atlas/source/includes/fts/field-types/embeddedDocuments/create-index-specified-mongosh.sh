db.companies.createSearchIndex(
  "default", 
  {
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
)
