db.companies.aggregate([
  {
    "$search": { 
      "compound": {
        "should": [
          {
            "embeddedDocument": {
              "path": "funding_rounds.investments",
              "operator": {
                "wildcard": {
                  "path": "funding_rounds.investments.financial_org.name",
                  "query": "*Ventures*",
                  "allowAnalyzedField": true
                }
              }
            }
          },
          {
            "hasRoot": {
              "operator": {
                "wildcard": {
                  "path": "description",
                  "query": "*network*",
                  "allowAnalyzedField": true
                }
              }
            }
          }
        ]
      },
      "returnScope": {"path": "funding_rounds"},
      "returnStoredSource": true
    }
  },
  {
    "$limit": 5
  }
])