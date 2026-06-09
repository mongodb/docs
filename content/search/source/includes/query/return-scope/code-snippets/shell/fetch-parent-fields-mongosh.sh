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
  { "$sort": { "raised_amount": -1 } },
  { "$limit": 10 },
  { "$addFields": { "root_id": { "$meta": "searchRootDocumentId" } } },
  {
    "$lookup": {
      "from": "companies",
      "localField": "root_id",
      "foreignField": "_id",
      "as": "company"
    }
  },
  { "$unwind": "$company" },
  {
    "$project": {
      "_id": 0,
      "round_code": 1,
      "raised_amount": 1,
      "raised_currency_code": 1,
      "company.name": 1
    }
  }
])
