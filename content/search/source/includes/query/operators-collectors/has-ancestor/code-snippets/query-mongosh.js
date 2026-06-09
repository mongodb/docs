db.companies.aggregate([
  { 
    "$search": { 
      "returnStoredSource": true, 
      "returnScope": { "path": "funding_rounds.investments" }, 
      "hasAncestor": { 
        "ancestorPath": "funding_rounds", 
        "operator": { 
          "equals": { 
            "path": "funding_rounds.funded_year", 
            "value": 2005 
          } 
        } 
      } 
    } 
  }
])