// :snippet-start: project-array-field-path
db.products.aggregate( [
   {
      $project: {
         _id: 0,
         item: 1,
         warehouses: "$instock.warehouse"
      }
   }
] )
// :snippet-end:
