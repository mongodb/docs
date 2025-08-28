db.listingsAndReviews_totalPrice.createSearchIndex(
  "totalPriceIndex",
  {
    "mappings": {
      "dynamic": true
    },
    "storedSource": {
      "include": [
        "totalPrice"
      ]
    }
  }
)
