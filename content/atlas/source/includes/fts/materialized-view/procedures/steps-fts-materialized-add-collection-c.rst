.. procedure::
   :style: normal

   .. step:: Set up the C project.

      In your terminal, navigate to where you want to create your application, 
      then run the following command to create a directory called 
      ``search-materialized-view`` for this project: 

      .. code-block:: shell
         :copyable: true

         mkdir search-materialized-view
         cd search-materialized-view

      Add the C driver to your project by following the instructions in the 
      `MongoDB C Driver documentation <https://www.mongodb.com/docs/languages/c/c-driver/current/get-started/>`__.

   .. step:: Definethe ``purchaseOrders`` collection documents.

      Create a ``create-collection.c`` file in your project directory, 
      and copy and paste the following code into the file. This code
      performs the following actions:

      - Inserts documents into a new ``purchaseOrders`` collection in the
        ``sample_supplies`` database.

      - Runs a simple query to display the documents in the
        ``purchaseOrders`` collection, sorted by the ``saleDate`` field
        in descending order.

      .. literalinclude:: /includes/fts/materialized-view/create-collection.c
         :caption: create-collection.c
         :language: c
         :linenos:
         :copyable:

      .. include:: /includes/search-shared/find-connection-string.rst

   .. step:: Set up a CMake application

      To configure your application, create a ``CMakeLists.txt`` file in
      your project directory. Then, add the following code to the file:

      .. literalinclude:: /includes/fts/materialized-view/initialize-cmake-c.rst
         :caption: CMakeLists.txt
         :language: txt
         :linenos:
         :copyable:

      The preceding code performs the following actions:
      
      - Configures a C project.
      - Creates a ``index.out`` executable for your application.
      - Finds and requires the C driver. Replace the ``<version>``
        placeholder with your C driver version, such as ``2.0.0``.
      - Links the program to the ``libmongoc`` library.

      .. note::

         In the sample ``CMakeLists.txt`` file, the ``mongoc::mongoc`` target
         points to either the static library or the shared library.
         The library type depends on which one is available and
         whichever type the user specifies in the ``MONGOC_DEFAULT_IMPORTED_LIBRARY_TYPE``
         CMake configuration setting. If you don't set this value and
         both library types are available, ``mongoc::mongoc`` uses
         the static library.

         You can use the ``mongoc::static`` target to explicitly use the 
         static library or the ``mongoc::shared`` target to use the shared
         library.

   .. step:: Populate the ``purchaseOrders`` collection and display its documents.

      In your terminal, run the following commands to build and run this 
      application: 
      
      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            cmake -S. -Bcmake-build
            cmake --build cmake-build --target collection.out
            ./cmake-build/collection.out

         .. output::

            Successfully inserted purchase order documents.

            Query results:
            { "_id" : { "$oid" : "..." }, "saleDate" : { "$date" : { "$numberLong" : "1516874462918" } }, "items" : [ { "quantity" : { "$numberInt" : "10" } }, { "quantity" : { "$numberInt" : "9" } }, { "quantity" : { "$numberInt" : "3" } }, { "quantity" : { "$numberInt" : "4" } }, { "quantity" : { "$numberInt" : "4" } }, { "quantity" : { "$numberInt" : "1" } }, { "quantity" : { "$numberInt" : "2" } }, { "quantity" : { "$numberInt" : "4" } } ], "storeLocation" : "Seattle", "customer" : { "gender" : "M", "age" : { "$numberInt" : "50" }, "email" : "keecade@hem.uy", "satisfaction" : { "$numberInt" : "5" } }, "couponUsed" : false, "purchaseMethod" : "Phone" }
            { "_id" : { "$oid" : "..." }, "saleDate" : { "$date" : { "$numberLong" : "1516741609506" } }, "items" : [ { "quantity" : { "$numberInt" : "2" } }, { "quantity" : { "$numberInt" : "2" } }, { "quantity" : { "$numberInt" : "5" } }, { "quantity" : { "$numberInt" : "2" } }, { "quantity" : { "$numberInt" : "2" } }, { "quantity" : { "$numberInt" : "8" } }, { "quantity" : { "$numberInt" : "3" } } ], "storeLocation" : "Denver", "customer" : { "gender" : "M", "age" : { "$numberInt" : "42" }, "email" : "cauho@witwuta.sv", "satisfaction" : { "$numberInt" : "4" } }, "couponUsed" : true, "purchaseMethod" : "Phone" }

