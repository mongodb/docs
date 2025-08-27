.. procedure::
   :style: normal

   .. step:: Specify a simple |fts| query on the ``sample_supplies.monthlyPhoneTransactions`` collection.

      Create a ``query.c`` file in your ``search-materialized-view`` project directory, 
      and copy and paste the following code into the file.  

      .. literalinclude:: /includes/fts/materialized-view/query.c
         :caption: query.c   
         :language: c
         :linenos:
         :copyable:

      .. include:: /includes/search-shared/find-connection-string.rst

   .. step:: Modify your ``CMakeLists.txt`` file

      Edit the ``CMakeLists.txt`` file created in the previous section
      to resemble the following code:

      .. code-block:: c
         :caption: CMakeLists.txt

         cmake_minimum_required(VERSION 3.11)
         project(search-materialized-view LANGUAGES C)
         add_executable (query.out query.c)
         find_package(mongoc <version> REQUIRED)
         target_link_libraries(query.out mongoc::mongoc)

   .. step:: Run the query.

      In your terminal, run the following commands to build and run this 
      application: 

      .. code-block:: shell
         :copyable: true

         cmake -S. -Bcmake-build
         cmake --build cmake-build --target query.out
         ./cmake-build/query.out

      The above query returns ``4``, indicating that only 4 months out of all the months in the
      ``monthlyPhoneTransactions`` materialized view had total sales 
      greater than or equal to 10000 dollars. This result reflects data 
      from both the ``sample_supplies.sales`` and 
      ``sample_supplies.purchaseOrders`` collections.
