.. procedure::
   :style: normal

   .. step:: Set up the C++ project.

      In your terminal, navigate to where you want to create your application, 
      then run the following command to create a directory called 
      ``search-materialized-view`` for this project: 

      .. code-block:: shell
         :copyable: true

         mkdir search-materialized-view
         cd search-materialized-view

      For more detailed installation instructions, see the
      `MongoDB C++ Driver documentation <https://www.mongodb.com/docs/languages/cpp/cpp-driver/current/get-started/>`__.

   .. step:: Define the ``purchaseOrders`` collection documents.

      Create a ``create-collection.cpp`` file in your project directory, 
      and copy and paste the following code into the file. This code
      performs the following actions:

      - Inserts documents into a new ``purchaseOrders`` collection in the
        ``sample_supplies`` database.

      - Runs a simple query to display the documents in the
        ``purchaseOrders`` collection, sorted by the ``saleDate`` field
        in descending order.

      .. literalinclude:: /includes/fts/materialized-view/create-collection.cpp
         :caption: create-collection.cpp
         :language: cpp
         :linenos:
         :copyable:

      .. include:: /includes/search-shared/find-connection-string.rst

   .. step:: Populate the ``purchaseOrders`` collection and display its documents.

      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            c++ --std=c++17 create-collection.cpp $(pkg-config --cflags --libs libmongocxx) -o ./app.out
            ./app.out

         .. output::
            :visible: false

            Successfully inserted purchase order documents.
            
            Query results:
            { _id: ObjectId("..."), saleDate: 2018-01-25T10:01:02.918Z, items: [ ... ], storeLocation: "Seattle", customer: { ... }, couponUsed: false, purchaseMethod: "Phone" }
            { _id: ObjectId("..."), saleDate: 2018-01-23T21:06:49.506Z, items: [ ... ], storeLocation: "Denver", customer: { ... }, couponUsed: true, purchaseMethod: "Phone" }
      
      .. tip:: MacOS Error
         
         MacOS users might see the following error after running the preceding 
         commands:

         .. code-block:: sh
         
            dyld[54430]: Library not loaded: @rpath/libmongocxx._noabi.dylib

         To resolve this error, use the ``-Wl,-rpath`` linker option to set 
         the ``@rpath``, as shown in the following code:

         .. code-block:: sh
         
            c++ --std=c++17 create-collection.cpp -Wl,-rpath,/usr/local/lib/ $(pkg-config --cflags --libs libmongocxx) -o ./app.out
            ./app.out
