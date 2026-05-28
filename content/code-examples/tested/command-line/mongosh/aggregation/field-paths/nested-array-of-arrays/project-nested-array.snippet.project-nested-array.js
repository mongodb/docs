db.fruits.aggregate( [
   {
      $project: {
         all_apples: "$inventory.apples"
      }
   }
] )
