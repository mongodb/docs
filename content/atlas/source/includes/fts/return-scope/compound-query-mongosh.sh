db.companies.aggregate(
  {
    "$search": {
      "compound": {
        "must": [{
          "text": {
            "path": "funding_rounds.raised_currency_code",
            "query": "usd"
          }
        }],
        "should": [{
          "phrase": {
            "path": "funding_rounds.investments.financial_org",
            "query": "Trinity Ventures",
          }
        }]
      },
      "returnStoredSource": true,
      "returnScope": {
        "path": "funding_rounds"
      }
    }
  },
  {
    "$limit": 5
  }
)