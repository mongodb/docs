// :snippet-start: fill-example-partition
db.restaurantReviewsMultiple.aggregate( [
   {
      $fill:
         {
            sortBy: { date: 1 },
            partitionBy: { "restaurant": "$restaurant" },
            output:
               {
                  "score": { method: "locf" }
               }
         }
   }
] )
// :snippet-end:
