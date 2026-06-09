db.createView(
  "listings_SearchablePrice",
  "listingsAndReviews",
  [
    {
      "$addFields": {
        "totalPrice": {
          "$add": [
            {
              "$ifNull": [{ "$toDouble": "$price" }, 0]
            },
            {
              "$ifNull": [{ "$toDouble": "$cleaning_fee" }, 0]
            }
          ]
        }
      }
    }
  ]
)