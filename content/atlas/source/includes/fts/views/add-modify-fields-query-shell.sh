db.listingsAndReviews_totalPrice.aggregate([
  {
    $search: {
      index: "totalPriceIndex",
      range: {
        path: "totalPrice",
        lte: 300
      },
      returnStoredSource: true
    }
  }
])
