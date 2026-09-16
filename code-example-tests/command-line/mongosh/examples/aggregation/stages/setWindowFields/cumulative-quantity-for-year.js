// :snippet-start: cumulative-quantity-for-year
db.cakeSales.aggregate( [
   {
      $setWindowFields: {
         partitionBy: { $year: "$orderDate" },
         sortBy: { orderDate: 1 },
         output: {
            cumulativeQuantityForYear: {
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
