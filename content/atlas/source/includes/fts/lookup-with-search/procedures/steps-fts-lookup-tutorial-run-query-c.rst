.. procedure::
   :style: normal 

   .. step:: Create a file named ``lookup-with-search-query.c`` in your project directory.

   .. step:: Copy and paste the query into the ``lookup-with-search-query.c`` file.

      .. include:: /includes/fts/lookup-with-search/query-intro.rst

      .. literalinclude:: /includes/fts/lookup-with-search/query.c
         :language: c
         :linenos:
         :dedent:
         :emphasize-lines: 27

   .. step:: Replace the ``<connection-string>`` in the query and then save the file.

      Ensure that your connection string includes your database user's
      credentials. To learn more, see :ref:`connect-via-driver`.

   .. step:: Modify your ``CMakeLists.txt`` file

      Edit the ``CMakeLists.txt`` file created in the previous section
      to resemble the following code:

      .. code-block:: c
         :caption: CMakeLists.txt

         cmake_minimum_required(VERSION 3.11)
         project(atlas-search-index LANGUAGES C)
         add_executable (index.out lookup-with-search-query.c)
         find_package(mongoc <version> REQUIRED)
         target_link_libraries(index.out mongoc::mongoc)

   .. step:: Run the command to query your collection.

      .. io-code-block::
         :copyable: true
      
         .. input:: 
            :language: shell
            
            cmake -S. -Bcmake-build
            cmake --build cmake-build --target index.out
            ./cmake-build/index.out
      
         .. output::
            :language: none

            { "name" : "Lindsay Cowan", "email" : "cooperalexis@hotmail.com", "accounts" : [ { "$numberInt" : "116508" } ], "purchases" : [ ] }
            { "name" : "Dr. Angela Brown", "email" : "michaelespinoza@gmail.com", "accounts" : [ { "$numberInt" : "571880" } ], "purchases" : [ ] }
            { "name" : "Brian Flores", "email" : "april04@gmail.com", "accounts" : [ { "$numberInt" : "550665" }, { "$numberInt" : "321695" } ], "purchases" : [ { "account_id" : { "$numberInt" : "321695" }, "limit" : { "$numberInt" : "10000" }, "products" : [ "Derivatives", "Commodity", "CurrencyService", "Brokerage", "InvestmentStock" ] } ] }
            { "name" : "Shirley Rodriguez", "email" : "jonathan95@yahoo.com", "accounts" : [ { "$numberInt" : "784245" }, { "$numberInt" : "896066" }, { "$numberInt" : "991412" }, { "$numberInt" : "951840" } ], "purchases" : [ { "account_id" : { "$numberInt" : "991412" }, "limit" : { "$numberInt" : "10000" }, "products" : [ "CurrencyService", "Commodity", "InvestmentFund", "InvestmentStock" ] }, { "account_id" : { "$numberInt" : "951840" }, "limit" : { "$numberInt" : "10000" }, "products" : [ "InvestmentFund", "Commodity", "CurrencyService", "InvestmentStock" ] }, { "account_id" : { "$numberInt" : "896066" }, "limit" : { "$numberInt" : "10000" }, "products" : [ "Derivatives", "InvestmentFund", "Brokerage", "CurrencyService", "InvestmentStock" ] } ] }
            { "name" : "Clinton Shelton", "email" : "acook@gmail.com", "accounts" : [ { "$numberInt" : "602560" }, { "$numberInt" : "986196" }, { "$numberInt" : "51080" }, { "$numberInt" : "690617" }, { "$numberInt" : "225602" } ], "purchases" : [ ] }

            