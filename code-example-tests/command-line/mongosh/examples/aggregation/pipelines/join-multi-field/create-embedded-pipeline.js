embedded_pl = [
   // Stage 1: Match the values of two fields on each side of the join
   // The $eq filter uses aliases for the name and variation fields set
   { $match: {
      $expr: {
         $and: [
            { $eq: ["$product_name", "$$prdname"] },
            { $eq: ["$product_variation", "$$prdvartn"] }
         ]
      }
   } },

   // Stage 2: Match orders placed in 2020
   { $match: {
      orderdate: {
         $gte: new Date("2020-01-01T00:00:00Z"),
         $lt: new Date("2021-01-01T00:00:00Z")
      }
   } },

   // Stage 3: Remove unneeded fields from the orders collection side of the join
   { $unset: ["_id", "product_name", "product_variation"] }
]