// :snippet-start: fill-example-linear
db.stock.aggregate( [
   {
      $fill:
         {
            sortBy: { time: 1 },
            output:
               {
                  "price": { method: "linear" }
               }
         }
   }
] )
// :snippet-end:
