.. start-prep-steps

This example uses an ``orders`` collection, which contains documents
describing product orders. Because each order contains multiple products,
the first step of the aggregation unpacks the products array into
individual product order documents.

To create the ``orders`` collection, use the
:method:`~db.collection.insertMany()` method:

.. code-block:: javascript

   db.orders.deleteMany({})

   db.orders.insertMany( [
      {
         order_id: 6363763262239,
         products: [
            {
               prod_id: "abc12345",
               name: "Asus Laptop",
               price: 431
            },
            {
               prod_id: "def45678",
               name: "Karcher Hose Set",
               price: 22
            }
         ]
      },
      {
         order_id: 1197372932325,
         products: [
            {
               prod_id: "abc12345",
               name: "Asus Laptop",
               price: 429
            }
         ]
      },
      {
         order_id: 9812343774839,
         products: [
            {
               prod_id: "pqr88223",
               name: "Morphy Richards Food Mixer",
               price: 431
            },
            {
               prod_id: "def45678",
               name: "Karcher Hose Set",
               price: 21
            }
         ]
      },
      {
         order_id: 4433997244387,
         products: [
            {
               prod_id: "def45678",
               name: "Karcher Hose Set",
               price: 23
            },
            {
               prod_id: "jkl77336",
               name: "Picky Pencil Sharpener",
               price: 1
            },
            {
               prod_id: "xyz11228",
               name: "Russell Hobbs Chrome Kettle",
               price: 16
            }
         ]
      }
   ] )

.. end-prep-steps

.. start-tutorial

.. procedure:: 
   :style: connected

   .. step:: Run the aggregation pipeline.

      .. code-block:: javascript

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

   .. step:: Interpret the aggregation results.

      The aggregation returns the following summary of customers' orders
      from 2020:

      .. code-block:: javascript
         :copyable: false
         
         {
           product: 'Asus Laptop',
           total_value: 860,
           quantity: 2,
           product_id: 'abc12345'
         }
         {
           product: 'Morphy Richards Food Mixer',
           total_value: 431,
           quantity: 1,
           product_id: 'pqr88223'
         }
         {
           product: 'Russell Hobbs Chrome Kettle',
           total_value: 16,
           quantity: 1,
           product_id: 'xyz11228'
         }
         {
           product: 'Karcher Hose Set',
           total_value: 66,
           quantity: 3,
           product_id: 'def45678'
         }

      .. note::

         If you run this example, the order of documents in your results
         might differ from the order of documents on this page because the
         aggregation pipeline does not contain a sort stage. 

.. end-tutorial
