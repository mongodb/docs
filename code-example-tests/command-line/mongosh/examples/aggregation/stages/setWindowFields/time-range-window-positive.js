// :snippet-start: time-range-window-positive
db.cakeSales.aggregate( [
   {
      $setWindowFields: {
         partitionBy: "$state",
         sortBy: { orderDate: 1 },
         output: {
            recentOrders: {
               $push: "$orderDate",
               window: {
                  range: [ "unbounded", 10 ],
                  unit: "month"
               }
            }
         }
      }
   }
] )
// :snippet-end:
