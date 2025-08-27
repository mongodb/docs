db.orders.aggregate( [

   // Stage 1: Unwind the array of product orders
   { $unwind: { path: "$products" } },

   // Stage 2: Match products that cost more than $15
   { $match: { "products.price": { $gt: 15 } } },

   // Stage 3: Group products by product type
   { $group:
      {
         _id: "$products.prod_id",
         product: { $first: "$products.name"  },
         total_value: { $sum: "$products.price" },
         quantity: { $sum: 1 }
      }
   },

   // Stage 4: Display the product ID
   { $set: { product_id: "$_id" } },

   // Stage 5: Remove unneeded fields
   { $unset: [ "_id"] }
] )