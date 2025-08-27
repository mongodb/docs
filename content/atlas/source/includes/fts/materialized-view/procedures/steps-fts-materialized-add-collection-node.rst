.. procedure::
   :style: normal

   .. step:: Initialize your Node.js project.

      .. code-block:: shell
         :copyable: true

         mkdir search-materialized-view
         cd search-materialized-view
         npm init -y
         npm install mongodb

      For detailed installation instructions, see the
      :driver:`MongoDB Node Driver documentation </node/current/get-started/>`.

   .. step:: Define the ``purchaseOrders`` collection documents.

      Create a ``create-collection.js`` file in your project directory, 
      and copy and paste the following code into the file. This code
      performs the following actions:

      - Inserts documents into a new ``purchaseOrders`` collection in the
        ``sample_supplies`` database.

      - Runs a simple query to display the documents in the
        ``purchaseOrders`` collection, sorted by the ``saleDate`` field
        in descending order.
   
      .. literalinclude:: /includes/fts/materialized-view/create-collection.js
         :caption: create-collection.js
         :language: javascript
         :copyable:
         :linenos:

      .. include:: /includes/search-shared/find-connection-string.rst

   .. step:: Populate the ``purchaseOrders`` collection and display its documents.

      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            node create-collection.js

         .. output::
            :visible: false

            Successfully inserted purchase order documents.
            
            Query results:
            {
              _id: new ObjectId("..."),
              saleDate: 2018-01-25T10:01:02.918Z,
              items: [
                { quantity: 10 },
                { quantity: 9 },
                { quantity: 3 },
                { quantity: 4 },
                { quantity: 4 },
                { quantity: 1 },
                { quantity: 2 },
                { quantity: 4 }
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
            }
            {
              _id: new ObjectId("..."),
              saleDate: 2018-01-23T21:06:49.506Z,
              items: [
                { quantity: 2 },
                { quantity: 2 },
                { quantity: 5 },
                { quantity: 2 },
                { quantity: 2 },
                { quantity: 8 },
                { quantity: 3 }
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
