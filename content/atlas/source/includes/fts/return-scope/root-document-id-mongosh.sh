db.companies.aggregate([
  {
    "$search": {
      "returnStoredSource": true,
      "returnScope": {
        "path": "funding_rounds"
      },
      "range": {
        "path": "funding_rounds.raised_amount",
        "gte": 5000000,
        "lte": 10000000
      }
    }
  },
  {
    "$group": {
      "_id": { "$meta": "searchRootDocumentId" },
      "funding_rounds": {
        "$push": {
          "round_code": "$round_code",
          "raised_amount": "$raised_amount",
          "raised_currency_code": "$raised_currency_code"
        }
      },
      "avgRaisedAmount": { "$avg": "$raised_amount" }
    }
  },
  { "$sort": { "avgRaisedAmount": -1 } },
  { "$limit": 10 }
])
