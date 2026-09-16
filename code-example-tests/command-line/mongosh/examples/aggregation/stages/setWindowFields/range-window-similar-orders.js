// :snippet-start: range-window-similar-orders
db.cakeSales.aggregate( [
   {
      $setWindowFields: {
         partitionBy: "$state",
         sortBy: { price: 1 },
         output: {
            quantityFromSimilarOrders: {
               $sum: "$quantity",
               window: {
                  range: [ -10, 10 ]
               }
            }
         }
      }
   }
] )
// :snippet-end:
