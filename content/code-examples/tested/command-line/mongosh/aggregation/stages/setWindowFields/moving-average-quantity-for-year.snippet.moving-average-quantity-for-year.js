db.cakeSales.aggregate( [
   {
      $setWindowFields: {
         partitionBy: { $year: "$orderDate" },
         sortBy: { orderDate: 1 },
         output: {
            averageQuantity: {
               $avg: "$quantity",
               window: {
                  documents: [ -1, 0 ]
               }
            }
         }
      }
   }
] )
