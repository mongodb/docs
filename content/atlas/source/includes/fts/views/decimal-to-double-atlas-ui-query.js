[
  {
    "$search": {
      "index": "listingsSearchablePrice",
      "range": {
        "path": "totalPrice",
        "gte": 100,
        "lte": 200
      }
    }
  }
]