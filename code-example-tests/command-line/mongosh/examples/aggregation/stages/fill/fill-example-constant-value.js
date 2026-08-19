// :snippet-start: fill-example-constant-value
db.dailySales.aggregate( [
   {
      $fill:
         {
            output:
               {
                  "bootsSold": { value: 0 },
                  "sandalsSold": { value: 0 },
                  "sneakersSold": { value: 0 }
               }
         }
   }
] )
// :snippet-end:
