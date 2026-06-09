db.createView(
  "listingsAndReviews_totalPrice",
  "listingsAndReviews",
  [
    {
      $addFields: {
        totalPrice: {
          $add: [
            {
              $ifNull: [{ $toDouble: "$price" }, 0]
            },
            {
              $ifNull: [{ $toDouble: "$cleaning_fee" }, 0]
            }
          ]
        }
      }
    }
  ]
)
