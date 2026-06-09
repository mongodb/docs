db.companies.aggregate(
  {
    "$search": {
      "range": {
        "path": "funding_rounds.raised_amount",
        "gte": 5000000,
        "lte": 10000000
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