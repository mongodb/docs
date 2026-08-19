db.restaurantReviews.aggregate( [
   {
      $fill:
         {
            sortBy: { date: 1 },
            output:
               {
                  "score": { method: "locf" }
               }
         }
   }
] )
