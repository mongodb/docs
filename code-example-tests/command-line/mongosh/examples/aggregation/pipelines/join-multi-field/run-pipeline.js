db.products.aggregate( [
   // Use the embedded pipeline in a lookup stage
   { $lookup: {
         from: "orders",
         let: {
            prdname: "$name",
            prdvartn: "$variation"
         },
         pipeline: embedded_pl,
         as: "orders"
   } },

   // Match products ordered in 2020
   { $match: { orders: { $ne: [] } } },

   // Remove unneeded fields
   { $unset: ["_id", "description"] }
] )