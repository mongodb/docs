// :snippet-start: cumulative-quantity-for-state
db.cakeSales.aggregate( [
   {
      $setWindowFields: {
         partitionBy: "$state",
         sortBy: { orderDate: 1 },
         output: {
            cumulativeQuantityForState: {
               $sum: "$quantity",
               window: {
                  documents: [ "unbounded", "current" ]
               }
            }
         }
      }
   }
] )
// :snippet-end:
