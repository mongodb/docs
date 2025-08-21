.. procedure::
   :style: normal 

   .. step:: Create a file named ``search-with-unionwith-query.c`` in your project directory.

   .. step:: Copy and paste the query into the ``search-with-unionwith-query.c`` file.

      .. include:: /includes/fts/extracts/search-with-unionwith-query-desc.rst

      .. tabs:: 

         .. tab:: Basic Example 
            :tabid: basic

            .. include:: /includes/fts/extracts/search-with-unionwith-basic-query-desc.rst

            .. literalinclude:: /includes/fts/search-with-unionwith/basic-query.c
               :language: c
               :linenos:
               :dedent:
               :emphasize-lines: 17

         .. tab:: Facet Example 
            :tabid: facet

            .. include:: /includes/fts/extracts/search-with-unionwith-facet-query-desc.rst

            .. literalinclude:: /includes/fts/search-with-unionwith/facet-query.c
               :language: c
               :linenos:
               :dedent:
               :emphasize-lines: 17

   .. step:: Replace the ``<connection-string>`` in the query and then save the file.

      Ensure that your connection string includes your database user's
      credentials. To learn more, see :ref:`connect-via-driver`.

   .. step:: Modify your ``CMakeLists.txt`` file

      Edit the ``CMakeLists.txt`` file created in the previous section
      to resemble the following code:

      .. code-block:: c
         :caption: CMakeLists.txt

         cmake_minimum_required(VERSION 3.11)
         project(search-with-unionwith LANGUAGES C)
         add_executable (unionwith.out search-with-unionwith-query.c)
         find_package(mongoc <version> REQUIRED)
         target_link_libraries(unionwith.out mongoc::mongoc)

   .. step:: Run the command to query your collection.

      .. tabs::
         :hidden: 

         .. tab:: Basic Example 
            :tabid: basic

            .. io-code-block::
               :copyable: true
      
               .. input:: 
                  :language: shell
            
                  cmake -S. -Bcmake-build
                  cmake --build cmake-build --target unionwith.out
                  ./cmake-build/unionwith.out
      
               .. output::
                  :language: javascript

                  { "name" : "XLR8 Mobile", "number_of_employees" : { "$numberInt" : "21" }, "founded_year" : { "$numberInt" : "2006" }, "score" : { "$numberDouble" : "2.0815043449401855469" }, "source" : "companies" }
                  { "name" : "Pulse Mobile", "number_of_employees" : null, "founded_year" : null, "score" : { "$numberDouble" : "2.0815043449401855469" }, "source" : "companies" }
                  { "name" : "T-Mobile", "number_of_employees" : null, "founded_year" : null, "score" : { "$numberDouble" : "2.0815043449401855469" }, "source" : "companies" }
                  { "business_name" : "T. MOBILE", "address" : { "city" : "BROOKLYN", "zip" : { "$numberInt" : "11209" }, "street" : "86TH ST", "number" : { "$numberInt" : "440" } }, "source" : "inspections", "score" : { "$numberDouble" : "2.9009163379669189453" } }
                  { "business_name" : "BOOST MOBILE", "address" : { "city" : "BRONX", "zip" : { "$numberInt" : "10458" }, "street" : "E FORDHAM RD", "number" : { "$numberInt" : "261" } }, "source" : "inspections", "score" : { "$numberDouble" : "2.9009163379669189453" } }
                  { "business_name" : "SPRING MOBILE", "address" : { "city" : "SOUTH RICHMOND HILL", "zip" : { "$numberInt" : "11419" }, "street" : "LIBERTY AVE", "number" : { "$numberInt" : "12207" } }, "source" : "inspections", "score" : { "$numberDouble" : "2.9009163379669189453" } }

         .. tab:: Facet Example 
            :tabid: facet

            .. io-code-block::
               :copyable: true
      
               .. input:: 
                  :language: shell
            
                  cmake -S. -Bcmake-build
                  cmake --build cmake-build --target unionwith.out
                  ./cmake-build/unionwith.out
      
               .. output::
                  :language: javascript

                  {
                    "allDocs" : [
                      {
                        "name" : "XLR8 Mobile",
                        "number_of_employees" : { "$numberInt" : "21" },
                        "founded_year" : { "$numberInt" : "2006" },
                        "score" : { "$numberDouble" : "3.3304071426391601562" },
                        "source" : "companies",
                        "source_count" : { "$numberLong" : "52" }
                      },
                      {
                        "name" : "Pulse Mobile",
                        "number_of_employees" : null,
                        "founded_year" : null,
                        "score" : { "$numberDouble" : "3.3304071426391601562" },
                        "source" : "companies",
                        "source_count" : { "$numberLong" : "52" }
                      },
                      {
                        "name" : "T-Mobile",
                        "number_of_employees" : null,
                        "founded_year" : null,
                        "score" : { "$numberDouble" : "3.3304071426391601562" },
                        "source" : "companies",
                        "source_count" : { "$numberLong" : "52" }
                      },
                      {
                        "business_name" : "T. MOBILE",
                        "address" : {
                          "city" : "BROOKLYN",
                          "zip" : { "$numberInt" : "11209" },
                          "street" : "86TH ST",
                          "number" : { "$numberInt" : "440" }
                        },
                        "score" : { "$numberDouble" : "2.9009163379669189453" },
                        "source" : "inspections",
                        "source_count" : { "$numberLong" : "456" }
                      },
                      {
                        "business_name" : "BOOST MOBILE",
                        "address" : {
                          "city" : "BRONX",
                          "zip" : { "$numberInt" : "10458" },
                          "street" : "E FORDHAM RD",
                          "number" : { "$numberInt" : "261" }
                        },
                        "score" : { "$numberDouble" : "2.9009163379669189453" },
                        "source" : "inspections",
                        "source_count" : { "$numberLong" : "456" }
                      },
                      {
                        "business_name" : "SPRING MOBILE",
                        "address" : {
                          "city" : "SOUTH RICHMOND HILL",
                          "zip" : { "$numberInt" : "11419" },
                          "street" : "LIBERTY AVE",
                          "number" : { "$numberInt" : "12207" }
                        },
                        "score" : { "$numberDouble" : "2.9009163379669189453" },
                        "source" : "inspections",
                        "source_count" : { "$numberLong" : "456" }
                      }
                    ],
                    "totalCount" : [
                      {
                        "_id" : "inspections",
                        "totalCount" : { "$numberLong" : "456" }
                      },
                      {
                        "_id" : "companies",
                        "totalCount" : { "$numberLong" : "52" }
                      }
                    ]
                  }
