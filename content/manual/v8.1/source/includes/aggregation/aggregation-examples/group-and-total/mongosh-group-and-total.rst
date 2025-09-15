.. start-prep-steps

This example uses an ``orders`` collection, which contains documents
describing individual product orders. Because each order corresponds to
only one customer, the aggregation groups order documents by the ``customer_id``
field, which contains customer email addresses.

To create the ``orders`` collection, use the
:method:`~db.collection.insertMany()` method:

.. code-block:: javascript

   db.orders.deleteMany({})

   db.orders.insertMany( [
      {
         customer_id: "elise_smith@myemail.com",
         orderdate: new Date("2020-05-30T08:35:52Z"),
         value: 231,
      },
      {
         customer_id: "elise_smith@myemail.com",
         orderdate: new Date("2020-01-13T09:32:07Z"),
         value: 99,
      },
      {
         customer_id: "oranieri@warmmail.com",
         orderdate: new Date("2020-01-01T08:25:37Z"),
         value: 63,
      },
      {
         customer_id: "tj@wheresmyemail.com",
         orderdate: new Date("2019-05-28T19:13:32Z"),
         value: 2,
      },
      {
         customer_id: "tj@wheresmyemail.com",
         orderdate: new Date("2020-11-23T22:56:53Z"),
         value: 187,
      },
      {
         customer_id: "tj@wheresmyemail.com",
         orderdate: new Date("2020-08-18T23:04:48Z"),
         value: 4,
      },
      {
         customer_id: "elise_smith@myemail.com",
         orderdate: new Date("2020-12-26T08:55:46Z"),
         value: 4,
      },
      {
         customer_id: "tj@wheresmyemail.com",
         orderdate: new Date("2021-02-29T07:49:32Z"),
         value: 1024,
      },
      {
         customer_id: "elise_smith@myemail.com",
         orderdate: new Date("2020-10-03T13:49:44Z"),
         value: 102,
      }
   ] )

.. end-prep-steps

.. start-tutorial

.. procedure:: 
   :style: connected

   .. step:: Run the aggregation pipeline. 

      .. code-block:: javascript

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

            // Stage 3: Group orders by email address
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

   .. step:: Interpret the aggregation results.

      The aggregation returns the following summary of customers' orders
      from 2020. The result documents contain details on all orders
      placed by a given customer, grouped by the customer's email
      address.

      .. code-block:: javascript
         :copyable: false

         {
            first_purchase_date: ISODate("2020-01-01T08:25:37.000Z"),
            total_value: 63,
            total_orders: 1,
            orders: [ { orderdate: ISODate("2020-01-01T08:25:37.000Z"), value: 63 } ],
            customer_id: 'oranieri@warmmail.com'
         }
         {
            first_purchase_date: ISODate("2020-01-13T09:32:07.000Z"),
            total_value: 436,
            total_orders: 4,
            orders: [
               { orderdate: ISODate("2020-01-13T09:32:07.000Z"), value: 99 },
               { orderdate: ISODate("2020-05-30T08:35:52.000Z"), value: 231 },
               { orderdate: ISODate("2020-10-03T13:49:44.000Z"), value: 102 },
               { orderdate: ISODate("2020-12-26T08:55:46.000Z"), value: 4 }
            ],
            customer_id: 'elise_smith@myemail.com'
         }
         {
            first_purchase_date: ISODate("2020-08-18T23:04:48.000Z"),
            total_value: 191,
            total_orders: 2,
            orders: [
               { orderdate: ISODate("2020-08-18T23:04:48.000Z"), value: 4 },
               { orderdate: ISODate("2020-11-23T22:56:53.000Z"), value: 187 }
            ],
            customer_id: 'tj@wheresmyemail.com'
         }

.. end-tutorial
