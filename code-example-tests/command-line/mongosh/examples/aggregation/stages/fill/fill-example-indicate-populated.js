// :snippet-start: fill-example-indicate-populated
db.restaurantReviews.aggregate( [
   {
      $set: {
         "valueExisted": {
            "$ifNull": [
               { "$toBool": { "$toString": "$score" } },
               false
            ]
         }
      }
   },
   {
      $fill: {
         sortBy: { date: 1 },
         output:
            {
               "score": { method: "locf" }
            }
      }
   }
] )
// :snippet-end:
