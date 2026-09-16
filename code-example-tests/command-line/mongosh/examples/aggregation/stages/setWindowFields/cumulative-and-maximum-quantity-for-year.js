// :snippet-start: cumulative-and-maximum-quantity-for-year
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
            },
            maximumQuantityForYear: {
               $max: "$quantity",
               window: {
                  documents: [ "unbounded", "unbounded" ]
               }
            }
         }
      }
   }
] )
// :snippet-end:
