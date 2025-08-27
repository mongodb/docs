.. procedure::
   :style: normal
   
   .. step:: Set up the Python project.

      .. code-block:: shell
         :copyable: true

         mkdir search-materialized-view
         cd search-materialized-view
         pip install pymongo

      For detailed installation instructions, see the
      :driver:`MongoDB PyMongo Driver documentation </python/pymongo-driver/current/get-started/>`.

   .. step:: Define the ``purchaseOrders`` collection documents.

      Create a ``create_collection.py`` file in your project directory, 
      and copy and paste the following code into the file. This code
      performs the following actions:

      - Inserts documents into a new ``purchaseOrders`` collection in the
        ``sample_supplies`` database.

      - Runs a simple query to display the documents in the
        ``purchaseOrders`` collection, sorted by the ``saleDate`` field
        in descending order.
      
      .. literalinclude:: /includes/fts/materialized-view/create-collection.py
         :caption: create_collection.py
         :language: python
         :copyable:
         :linenos:

      .. include:: /includes/search-shared/find-connection-string.rst

   .. step:: Populate the ``purchaseOrders`` collection and display its documents.

      .. io-code-block::
         :copyable: true 

         .. input::
            :language: shell

            python create_collection.py

         .. output::
            :visible: false

            Successfully inserted purchase order documents.
            
            Query results:
            {'_id': ObjectId('...'), 'saleDate': datetime.datetime(2018, 1, 25, 10, 1, 2, 918000), 'items': [{'quantity': 10}, {'quantity': 9}, {'quantity': 3}, {'quantity': 4}, {'quantity': 4}, {'quantity': 1}, {'quantity': 2}, {'quantity': 4}], 'storeLocation': 'Seattle', 'customer': {'gender': 'M', 'age': 50, 'email': 'keecade@hem.uy', 'satisfaction': 5}, 'couponUsed': False, 'purchaseMethod': 'Phone'}
            {'_id': ObjectId('...'), 'saleDate': datetime.datetime(2018, 1, 23, 21, 6, 49, 506000), 'items': [{'quantity': 2}, {'quantity': 2}, {'quantity': 5}, {'quantity': 2}, {'quantity': 2}, {'quantity': 8}, {'quantity': 3}], 'storeLocation': 'Denver', 'customer': {'gender': 'M', 'age': 42, 'email': 'cauho@witwuta.sv', 'satisfaction': 4}, 'couponUsed': True, 'purchaseMethod': 'Phone'}
