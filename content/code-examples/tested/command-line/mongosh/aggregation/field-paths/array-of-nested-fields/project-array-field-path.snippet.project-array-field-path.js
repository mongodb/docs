db.products.aggregate( [
   {
      $project: {
         _id: 0,
         item: 1,
         warehouses: "$instock.warehouse"
      }
   }
] )
