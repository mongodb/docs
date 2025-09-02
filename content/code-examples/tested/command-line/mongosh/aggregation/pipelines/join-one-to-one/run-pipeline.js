db.orders.aggregate( [

   // Stage 1: Match orders that were placed in 2020
   { $match: {
      orderdate: {
         $gte: new Date("2020-01-01T00:00:00Z"),
         $lt: new Date("2021-01-01T00:00:00Z")
      }
   } },

   // Stage 2: Link the collections
   { $lookup: {
      from: "products",
      localField: "product_id",
      foreignField: "p_id",
      as: "product_mapping"
   } },

   // Stage 3: Create new document fields
   { $set: {
      product_mapping: { $first: "$product_mapping" }
   } },
   { $set: {
      product_name: "$product_mapping.name",
      product_category: "$product_mapping.category"
   } },

   // Stage 4: Remove unneeded fields
   { $unset: ["_id", "product_id", "product_mapping"] }
] )