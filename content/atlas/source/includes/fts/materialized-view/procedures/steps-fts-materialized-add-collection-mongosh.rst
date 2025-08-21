.. procedure::
   :style: normal

   .. step:: Connect to the ``sample_supplies`` database.
      
      a. Open {+mongosh+} in a terminal window and
         connect to your cluster. For detailed instructions on connecting,
         see :ref:`connect-mongo-shell`.
      
      #. Use the ``sample_supplies`` database: 

         .. code-block:: sh
            
            use sample_supplies

   .. step:: Add a new collection.

      Add the ``purchaseOrders`` collection with new phone purchase 
      order data from January of 2018. Run the following commands:

      .. code-block:: json
            
         db.purchaseOrders.insertMany( [
           {
             saleDate: ISODate("2018-01-23T21:06:49.506Z"),
             items: [
               {
                 name: 'printer paper',
                 tags: [ 'office', 'stationary' ],
                 price: Decimal128("40.01"),
                 quantity: 2
               },
               {
                 name: 'notepad',
                 tags: [ 'office', 'writing', 'school' ],
                 price: Decimal128("35.29"),
                 quantity: 2
               },
               {
                 name: 'pens',
                 tags: [ 'writing', 'office', 'school', 'stationary' ],
                 price: Decimal128("56.12"),
                 quantity: 5
               },
               {
                 name: 'backpack',
                 tags: [ 'school', 'travel', 'kids' ],
                 price: Decimal128("77.71"),
                 quantity: 2
               },
               {
                 name: 'notepad',
                 tags: [ 'office', 'writing', 'school' ],
                 price: Decimal128("18.47"),
                 quantity: 2
               },
               {
                 name: 'envelopes',
                 tags: [ 'stationary', 'office', 'general' ],
                 price: Decimal128("19.95"),
                 quantity: 8
               },
               {
                 name: 'envelopes',
                 tags: [ 'stationary', 'office', 'general' ],
                 price: Decimal128("8.08"),
                 quantity: 3
               },
               {
                 name: 'binder',
                 tags: [ 'school', 'general', 'organization' ],
                 price: Decimal128("14.16"),
                 quantity: 3
               }
             ],
             storeLocation: 'Denver',
             customer: {
               gender: 'M',
               age: 42,
               email: 'cauho@witwuta.sv',
               satisfaction: 4
             },
             couponUsed: true,
             purchaseMethod: 'Phone'
           }
         ])

      .. code-block:: json
            
         db.purchaseOrders.insertMany( [
           {
             saleDate: ISODate("2018-01-25T10:01:02.918Z"),
             items: [
               {
                 name: 'envelopes',
                 tags: [ 'stationary', 'office', 'general' ],
                 price: Decimal128("8.05"),
                 quantity: 10
               },
               {
                 name: 'binder',
                 tags: [ 'school', 'general', 'organization' ],
                 price: Decimal128("28.31"),
                 quantity: 9
               },
               {
                 name: 'notepad',
                 tags: [ 'office', 'writing', 'school' ],
                 price: Decimal128("20.95"),
                 quantity: 3
               },
               {
                 name: 'laptop',
                 tags: [ 'electronics', 'school', 'office' ],
                 price: Decimal128("866.5"),
                 quantity: 4
               },
               {
                 name: 'notepad',
                 tags: [ 'office', 'writing', 'school' ],
                 price: Decimal128("33.09"),
                 quantity: 4
               },
               {
                 name: 'printer paper',
                 tags: [ 'office', 'stationary' ],
                 price: Decimal128("37.55"),
                 quantity: 1
               },
               {
                 name: 'backpack',
                 tags: [ 'school', 'travel', 'kids' ],
                 price: Decimal128("83.28"),
                 quantity: 2
               },
               {
                 name: 'pens',
                 tags: [ 'writing', 'office', 'school', 'stationary' ],
                 price: Decimal128("42.9"),
                 quantity: 4
               },
               {
                 name: 'envelopes',
                 tags: [ 'stationary', 'office', 'general' ],
                 price: Decimal128("16.68"),
                 quantity: 2
               }
             ],
             storeLocation: 'Seattle',
             customer: { gender: 'M', age: 50, email: 'keecade@hem.uy', satisfaction: 5 },
             couponUsed: false,
             purchaseMethod: 'Phone'
           }
         ])

   .. step:: Query the new collection.

      Query the ``purchaseOrders`` collection to confirm the new 
      purchase order entries.

      .. io-code-block::
         :copyable: true

         .. input::
            :language: sh

            db.purchaseOrders.find().sort( {saleDate: -1} )

         .. output::
            :language: sh
            :visible: false

            {
              _id: ObjectId("62434c07d574cd0ce200ba75"),
              saleDate: ISODate("2018-01-25T10:01:02.918Z"),
              items: [
                {
                  name: 'envelopes',
                  tags: [ 'stationary', 'office', 'general' ],
                  price: Decimal128("8.05"),
                  quantity: 10
                },
                {
                  name: 'binder',
                  tags: [ 'school', 'general', 'organization' ],
                  price: Decimal128("28.31"),
                  quantity: 9
                },
                {
                  name: 'notepad',
                  tags: [ 'office', 'writing', 'school' ],
                  price: Decimal128("20.95"),
                  quantity: 3
                },
                {
                  name: 'laptop',
                  tags: [ 'electronics', 'school', 'office' ],
                  price: Decimal128("866.5"),
                  quantity: 4
                },
                {
                  name: 'notepad',
                  tags: [ 'office', 'writing', 'school' ],
                  price: Decimal128("33.09"),
                  quantity: 4
                },
                {
                  name: 'printer paper',
                  tags: [ 'office', 'stationary' ],
                  price: Decimal128("37.55"),
                  quantity: 1
                },
                {
                  name: 'backpack',
                  quantity: 2
                },
                {
                  name: 'pens',
                  quantity: 4
                },
                {
                  name: 'envelopes',
                  quantity: 2
                }
              ],
              storeLocation: 'Seattle',
              customer: { 
                gender: 'M',
                age: 50,
                email: 'keecade@hem.uy',
                satisfaction: 5 
              },
              couponUsed: false,
              purchaseMethod: 'Phone'
            },
            {
              _id: ObjectId("62434c07d574cd0ce200ba74"),
              saleDate: ISODate("2018-01-23T21:06:49.506Z"),
              items: [
                {
                  name: 'printer paper',
                  quantity: 2
                },
                {
                  name: 'notepad',
                  quantity: 2
                },
                {
                  name: 'pens',
                  quantity: 5
                },
                {
                  name: 'backpack',
                  quantity: 2
                },
                {
                  name: 'notepad',
                  quantity: 2
                },
                {
                  name: 'envelopes',
                  quantity: 8
                },
                {
                  name: 'envelopes',
                  quantity: 3
                },
                {
                  name: 'binder',
                  quantity: 3
                }
              ],
              storeLocation: 'Denver',
              customer: {
                gender: 'M',
                age: 42,
                email: 'cauho@witwuta.sv',
                satisfaction: 4
              },
              couponUsed: true,
              purchaseMethod: 'Phone'
            }
         
      The two query results reflect that the purchase order data ends in 
      January of 2018.
