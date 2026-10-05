db.productUpdates.aggregate( [
   {
      $setWindowFields: {
         partitionBy: "$product",
         sortBy: { date: 1 },
         output: {
            cumulativeSpecs: {
               $mergeObjects: "$specs",
               window: {
                  documents: [ "unbounded", "current" ]
               }
            }
         }
      }
   },
   { $sort: { product: 1, date: 1 } },
   { $project: { _id: 0, product: 1, date: 1, specs: 1, cumulativeSpecs: 1 } }
] )
