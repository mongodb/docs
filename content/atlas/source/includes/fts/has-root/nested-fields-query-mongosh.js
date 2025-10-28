db.companies.aggregate([
  {
    "$search": { 
      "returnStoredSource": true,
      "returnScope": { "path": "funding_rounds" },
      "hasRoot": {
        "operator": {
          "text": {
            "path": "name",
            "query": "Facebook"
          }
        }
      }
    }
  }
])
