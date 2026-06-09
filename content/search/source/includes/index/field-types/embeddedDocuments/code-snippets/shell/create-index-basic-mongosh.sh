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
      },
      "storedSource": true | false | {
       "include" | "exclude": [
         "<field-name>", 
         ...
       ]
     }
    }
  }
)