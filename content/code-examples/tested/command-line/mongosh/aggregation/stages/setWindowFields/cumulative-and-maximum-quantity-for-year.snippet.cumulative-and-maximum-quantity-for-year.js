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
