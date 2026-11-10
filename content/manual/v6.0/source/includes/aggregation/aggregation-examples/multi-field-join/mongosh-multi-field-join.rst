.. start-prep-steps

This example uses two collections:

- ``products``, which contains documents describing the products that a shop sells
- ``orders``, which contains documents describing individual orders for products in a shop

An order can only contain one product. The aggregation uses a
multi-field join to match a product document to documents representing
orders of that product. The aggregation joins collections by the ``name`` and
``variation`` fields in documents in the ``products`` collection, corresponding
to the ``product_name`` and ``product_variation`` fields in documents in the
``orders`` collection.

To create the ``orders`` and ``products`` collections, use the
:method:`~db.collection.insertMany()` method:

.. code-block:: javascript

   db.orders.deleteMany({})
   
   db.orders.insertMany( [
      {
         customer_id: "elise_smith@myemail.com",
         orderdate: new Date("2020-05-30T08:35:52Z"),
         product_name: "Asus Laptop",
         product_variation: "Standard Display",
         value: 431.43,
      },
      {
         customer_id: "tj@wheresmyemail.com",
         orderdate: new Date("2019-05-28T19:13:32Z"),
         product_name: "The Day Of The Triffids",
         product_variation: "2nd Edition",
         value: 5.01,
      },
      {
         customer_id: "oranieri@warmmail.com",
         orderdate: new Date("2020-01-01T08:25:37Z"),
         product_name: "Morphy Richards Food Mixer",
         product_variation: "Deluxe",
         value: 63.13,
      },
      {
         customer_id: "jjones@tepidmail.com",
         orderdate: new Date("2020-12-26T08:55:46Z"),
         product_name: "Asus Laptop",
         product_variation: "Standard Display",
         value: 429.65,
      }
   ] )

.. code-block:: javascript

   db.products.deleteMany({})

   db.products.insertMany( [
      {
         name: "Asus Laptop",
         variation: "Ultra HD",
         category: "ELECTRONICS",
         description: "Great for watching movies"
      },
      {
         name: "Asus Laptop",
         variation: "Standard Display",
         category: "ELECTRONICS",
         description: "Good value laptop for students"
      },
      {
         name: "The Day Of The Triffids",
         variation: "1st Edition",
         category: "BOOKS",
         description: "Classic post-apocalyptic novel"
      },
      {
         name: "The Day Of The Triffids",
         variation: "2nd Edition",
         category: "BOOKS",
         description: "Classic post-apocalyptic novel"
      },
      {
         name: "Morphy Richards Food Mixer",
         variation: "Deluxe",
         category: "KITCHENWARE",
         description: "Luxury mixer turning good cakes into great"
      }
   ] )

.. end-prep-steps

.. start-tutorial

.. procedure:: 
   :style: connected

   .. step:: Create an embedded pipeline to use in the lookup stage.

      The first stage of the pipeline is a ``$lookup`` stage to join the
      ``orders`` collection to the ``products`` collection by two
      fields in each collection. The ``$lookup`` stage contains an embedded
      pipeline to configure the join.

      .. code-block:: javascript

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

   .. step:: Run the aggregation pipeline.

      .. code-block:: javascript

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

   .. step:: Interpret the aggregation results.

      The aggregated results contain two documents. The documents
      represent products ordered 2020. Each document contains an
      ``orders`` array field that lists details about each order for
      that product.

      .. code-block:: javascript
         :copyable: false

         {
            name: 'Asus Laptop',
            variation: 'Standard Display',
            category: 'ELECTRONICS',
            orders: [
               {
                  customer_id: 'elise_smith@myemail.com',
                  orderdate: ISODate('2020-05-30T08:35:52.000Z'),
                  value: 431.43
               },
               {
                  customer_id: 'jjones@tepidmail.com',
                  orderdate: ISODate('2020-12-26T08:55:46.000Z'),
                  value: 429.65
               }
            ]
         }
         {
            name: 'Morphy Richards Food Mixer',
            variation: 'Deluxe',
            category: 'KITCHENWARE',
            orders: [
               {
                  customer_id: 'oranieri@warmmail.com',
                  orderdate: ISODate('2020-01-01T08:25:37.000Z'),
                  value: 63.13
               }
            ]
         }

.. end-tutorial
