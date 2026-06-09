{
  "name": "default",
  "collectionName": "companies",
  "database": "sample_training",
  "type": "search",
  "definition": {
    "mappings": {
      "dynamic": false,
      "fields": {
        "relationships": {
          "type": "embeddedDocuments",
          "dynamic": {
            "typeSet": "stringBooleanIndex"
          },
          "fields": {
            "person": {
              "type": "document",
              "dynamic": {
                "typeSet": "stringBooleanIndex"
              }
            }
          }
        }
      }
    },
    "typeSets": [
      {
        "name": "stringBooleanIndex",
        "types": [
          {
            "type": "boolean"
          },
          {
            "type": "string"
          }
        ]
      }
    ]
  }
}