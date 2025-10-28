{
  "mappings": { 
    "dynamic": false,
    "fields": { 
      "products": { 
        "type": "embeddedDocuments",
        "dynamic": true,
        "storedSource": true
      } 
    }
  },
  "storedSource": {
    "include": [ "_id", "name" ]
  }
}