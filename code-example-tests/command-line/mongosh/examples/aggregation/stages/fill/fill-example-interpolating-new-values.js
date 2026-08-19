// :snippet-start: fill-example-interpolating-new-values
db.restaurantReviewsMultiple.aggregate( [
   {
      $fill: {
         sortBy: { date: 1 },
         partitionBy: { "restaurant": "$restaurant" },
         output: { "score": { method: "linear" } }
      }
   }
] )
// :snippet-end:
