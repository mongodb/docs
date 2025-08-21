db.orders.aggregate( [
   // Stage 1: Match orders in 2020
   { $match: {
      orderdate: {
         $gte: new Date("2020-01-01T00:00:00Z"),
         $lt: new Date("2021-01-01T00:00:00Z"),
      }
   } },

   // Stage 2: Sort orders by date
   { $sort: { orderdate: 1 } },

   // Stage 3: Group orders by email address (customer_id)
   { $group: {
      _id: "$customer_id",
      first_purchase_date: { $first: "$orderdate" },
      total_value: { $sum: "$value" },
      total_orders: { $sum: 1 },
      orders: { $push:
         {
            orderdate: "$orderdate",
            value: "$value"
         }
      }
   } },

   // Stage 4: Sort orders by first order date
   { $sort: { first_purchase_date: 1 } },

   // Stage 5: Display the customers' email addresses
   { $set: { customer_id: "$_id" } },

   // Stage 6: Remove unneeded fields
   { $unset: ["_id"] }
] )