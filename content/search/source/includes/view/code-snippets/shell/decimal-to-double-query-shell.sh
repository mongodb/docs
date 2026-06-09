db.listingsAndReviews.aggregate([
  {
    "$search": {
      "index": "listingsSearchablePrice",
      "range": {
        "path": "totalPrice",
        "gte": 100,
        "lte": 200
      }
    }
  },
  {
    "$project": {
      "_id": 0,
      "totalPrice": 1,
      "price": 1,
      "cleaning_fee": 1
    }
  }
])
