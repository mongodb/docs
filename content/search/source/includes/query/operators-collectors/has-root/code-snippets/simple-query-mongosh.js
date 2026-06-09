db.companies.aggregate([
  {
    "$search": { 
      "returnStoredSource": true,
      "returnScope": { "path": "products" },
      "hasRoot": {
        "operator": {
          "range": {
            "path": "founded_year",
            "gte": 2005,
            "lte": 2010
          }
        }
      }
    }
  }
])
