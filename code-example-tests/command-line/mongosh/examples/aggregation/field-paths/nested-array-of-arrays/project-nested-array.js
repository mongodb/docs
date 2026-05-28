// :snippet-start: project-nested-array
db.fruits.aggregate( [
   {
      $project: {
         all_apples: "$inventory.apples"
      }
   }
] )
// :snippet-end:
