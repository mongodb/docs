.. start-prep-steps

This example uses two collections:

- ``orders``: documents that describe individual orders for products in a shop
- ``products``: documents that describe the products that a shop sells

An order can only contain one product. The aggregation uses a
one-to-one join to match an order document to the corresponding product
document. The aggregation joins the collections by the ``product_id`` field
that exists in documents in both collections.

To create the ``orders`` and ``products`` collections, use the
:method:`~db.collection.insertMany()` method:

.. code-block:: javascript

   db.orders.deleteMany({})

   db.orders.insertMany( [
      {
         customer_id: "elise_smith@myemail.com",
         orderdate: new Date("2020-05-30T08:35:52Z"),
         product_id: "a1b2c3d4",
         value: 431.43
      },
      {
         customer_id: "tj@wheresmyemail.com",
         orderdate: new Date("2019-05-28T19:13:32Z"),
         product_id: "z9y8x7w6",
         value: 5.01
      },
      {
         customer_id: "oranieri@warmmail.com",
         orderdate: new Date("2020-01-01T08:25:37Z"),
         product_id: "ff11gg22hh33",
         value: 63.13
      },
      {
         customer_id: "jjones@tepidmail.com",
         orderdate: new Date("2020-12-26T08:55:46Z"),
         product_id: "a1b2c3d4",
         value: 429.65
      }
   ] )

.. code-block:: javascript

   db.products.deleteMany({})

   db.products.insertMany( [
      {
         p_id: "a1b2c3d4",
         name: "Asus Laptop",
         category: "ELECTRONICS",
         description: "Good value laptop for students"
      },
      {
         p_id: "z9y8x7w6",
         name: "The Day Of The Triffids",
         category: "BOOKS",
         description: "Classic post-apocalyptic novel"
      },
      {
         p_id: "ff11gg22hh33",
         name: "Morphy Richardds Food Mixer",
         category: "KITCHENWARE",
         description: "Luxury mixer turning good cakes into great"
      },
      {
         p_id: "pqr678st",
         name: "Karcher Hose Set",
         category: "GARDEN",
         description: "Hose + nosels + winder for tidy storage"
      }
   ] )

.. end-prep-steps

.. start-tutorial

.. procedure:: 
   :style: connected

   .. step:: Run the aggregation pipeline.

      .. code-block:: javascript

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

      In this example, the ``$lookup`` stage always outputs a
      ``product_mapping`` array that contains one document. The ``$set``
      stage after the ``$lookup`` stage uses ``$first`` to extract the
      document from the ``product_mapping`` array. If you use this
      pipeline in a setting where the ``$lookup`` stage outputs an array
      of more than one document, consider using an explicit ``{ $limit:
      1 }`` stage in the ``$lookup`` stage. 

      .. note::

         If a supporting index on the ``foreignField`` does not exist, a
         ``$lookup`` operation that performs an equality match with a single
         join will likely have poor performance. For more information,
         see  and :ref:`Lookup Performance Considerations
         <lookup-performance-considerations>` and
         :ref:`manual-create-an-index`. 

   .. step:: Interpret the aggregation results.

      The aggregated results contain three documents. The documents
      represent customer orders that occurred in 2020, with the
      ``product_name`` and ``product_category`` of the ordered product:

      .. code-block:: javascript
         :copyable: false

         {
            customer_id: 'elise_smith@myemail.com',
            orderdate: ISODate('2020-05-30T08:35:52.000Z'),
            value: 431.43,
            product_name: 'Asus Laptop',
            product_category: 'ELECTRONICS'
         }
         {
            customer_id: 'oranieri@warmmail.com',
            orderdate: ISODate('2020-01-01T08:25:37.000Z'),
            value: 63.13,
            product_name: 'Morphy Richardds Food Mixer',
            product_category: 'KITCHENWARE'
         }
         {
            customer_id: 'jjones@tepidmail.com',
            orderdate: ISODate('2020-12-26T08:55:46.000Z'),
            value: 429.65,
            product_name: 'Asus Laptop',
            product_category: 'ELECTRONICS'
         }

      The result consists of documents that contain fields from
      documents in the ``orders`` collection and the ``products`` collection
      joined by matching the ``product_id`` field present in each original
      document.

.. end-tutorial
