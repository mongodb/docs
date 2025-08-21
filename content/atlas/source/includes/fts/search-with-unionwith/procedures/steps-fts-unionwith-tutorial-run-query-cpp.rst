.. procedure::
   :style: normal 

   .. step:: Create a file named ``search-with-unionwith-query.cpp`` in your project directory.

   .. step:: Copy and paste the query into the ``search-with-unionwith-query.cpp`` file.

      .. include:: /includes/fts/extracts/search-with-unionwith-query-desc.rst

      .. tabs:: 

         .. tab:: Basic Example 
            :tabid: basic

            .. include:: /includes/fts/extracts/search-with-unionwith-basic-query-desc.rst

            .. literalinclude:: /includes/fts/search-with-unionwith/basic-query.cpp
               :language: cpp
               :linenos:
               :dedent:
               :emphasize-lines: 20

         .. tab:: Facet Example 
            :tabid: facet

            .. include:: /includes/fts/extracts/search-with-unionwith-facet-query-desc.rst

            .. literalinclude:: /includes/fts/search-with-unionwith/facet-query.cpp
               :language: cpp
               :linenos:
               :dedent:
               :emphasize-lines: 20

   .. step:: Replace the ``<connection-string>`` in the query and then save the file.

      Ensure that your connection string includes your database user's
      credentials. To learn more, see :ref:`connect-via-driver`.

   .. step:: Compile and run the ``search-with-unionwith-query.cpp`` file.

      .. tabs::
         :hidden: 

         .. tab:: Basic Example 
            :tabid: basic

            .. io-code-block::
               :copyable: true
      
               .. input:: 
                  :language: bash
            
                  c++ --std=c++17 search-with-unionwith-query.cpp $(pkg-config --cflags --libs libmongocxx) -o ./o.out
                  ./o.out
      
               .. output:: 
                  :language: javascript

                  { "name" : "XLR8 Mobile", "number_of_employees" : 21, "founded_year" : 2006, "score" : 3.33040714263916, "source" : "companies" }
                  { "name" : "Pulse Mobile", "score" : 3.33040714263916, "source" : "companies" }
                  { "name" : "T-Mobile", "score" : 3.33040714263916, "source" : "companies" }
                  { "business_name" : "T. MOBILE", "address" : { "city" : "BROOKLYN", "zip" : 11209, "street" : "86TH ST", "number" : 440 }, "score" : 2.900916337966919, "source" : "inspections" }
                  { "business_name" : "BOOST MOBILE", "address" : { "city" : "BRONX", "zip" : 10458, "street" : "E FORDHAM RD", "number" : 261 }, "score" : 2.900916337966919, "source" : "inspections" }
                  { "business_name" : "SPRING MOBILE", "address" : { "city" : "SOUTH RICHMOND HILL", "zip" : 11419, "street" : "LIBERTY AVE", "number" : 12207 }, "score" : 2.900916337966919, "source" : "inspections" }

         .. tab:: Facet Example 
            :tabid: facet

            .. io-code-block::
               :copyable: true
      
               .. input:: 
                  :language: bash
            
                  c++ --std=c++17 search-with-unionwith-query.cpp $(pkg-config --cflags --libs libmongocxx) -o ./o.out
                  ./o.out
      
               .. output:: 
                  :language: javascript

                  { "allDocs" : [ ... ], "totalCount" : [ { "_id" : "inspections", "totalCount" : 456 }, { "_id" : "companies", "totalCount" : 52 } ] }
