.. procedure:: 
   :style: normal 

   .. step:: Ensure that your ``CLASSPATH`` contains the following libraries.

      .. list-table::
         :widths: 30 70 

         * - ``junit``
           - 4.11 or higher version 

         * - ``mongodb-driver-sync``
           - 4.3.0 or higher version

         * - ``slf4j-log4j12``
           - 1.7.30 or higher version

   .. step:: Create a file named ``SearchWithUnionwithQuery.java``.

   .. step:: Copy and paste the query into the ``SearchWithUnionwithQuery.java`` file.

      .. include:: /includes/fts/extracts/search-with-unionwith-query-desc.rst

      .. tabs:: 

         .. tab:: Basic Example
            :tabid: basic

            .. include:: /includes/fts/extracts/search-with-unionwith-basic-query-desc.rst

            .. literalinclude:: /includes/fts/search-with-unionwith/basic-query.java 
               :language: java
               :linenos:
               :dedent:
               :emphasize-lines: 12

         .. tab:: Facet Example
            :tabid: facet

            .. include:: /includes/fts/extracts/search-with-unionwith-facet-query-desc.rst

            .. literalinclude:: /includes/fts/search-with-unionwith/facet-query.java 
               :language: java
               :linenos:
               :dedent:
               :emphasize-lines: 9

      .. note:: 

         To run the sample code in your Maven environment, add the 
         following code above the import statements in your file.

         .. code-block:: 

            package com.mongodb.drivers;

   .. step:: Replace the ``<connection-string>`` in the query and then save the file.

      Ensure that your connection string includes your database user's
      credentials. To learn more, see :ref:`connect-via-driver`.

   .. step:: Compile and run the ``UinionwithWithSearchQuery.java`` file.

      .. tabs:: 
         :hidden:

         .. tab:: Basic Example
            :tabid: basic

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: bash

                  javac SearchWithUnionwithQuery.java
                  java SearchWithUnionwithQuery
        
               .. output::
                  :language: json
                  :visible: true

                  {"name": "XLR8 Mobile", "number_of_employees": 21, "founded_year": 2006, "score": 2.0815043449401855, "source": "companies"}
                  {"name": "Pulse Mobile", "number_of_employees": null, "founded_year": null, "score": 2.0815043449401855, "source": "companies"}
                  {"name": "T-Mobile", "number_of_employees": null, "founded_year": null, "score": 2.0815043449401855, "source": "companies"}
                  {"business_name": "T. MOBILE", "address": {"city": "BROOKLYN", "zip": 11209, "street": "86TH ST", "number": 440}, "source": "inspections", "score": 2.900916337966919}
                  {"business_name": "BOOST MOBILE", "address": {"city": "BRONX", "zip": 10458, "street": "E FORDHAM RD", "number": 261}, "source": "inspections", "score": 2.900916337966919}
                  {"business_name": "SPRING MOBILE", "address": {"city": "SOUTH RICHMOND HILL", "zip": 11419, "street": "LIBERTY AVE", "number": 12207}, "source": "inspections", "score": 2.900916337966919}

         .. tab:: Facet Example
            :tabid: facet

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: bash

                  javac SearchWithUnionwithQuery.java
                  java SearchWithUnionwithQuery
        
               .. output::
                  :language: json
                  :visible: true

                  {
                    "allDocs": [
                      {"name": "XLR8 Mobile", "number_of_employees": 21, "founded_year": 2006, "score": 3.33040714263916, "source": "companies", "source_count": 52}, 
                      {"name": "Pulse Mobile", "number_of_employees": null, "founded_year": null, "score": 3.33040714263916, "source": "companies", "source_count": 52}, 
                      {"name": "T-Mobile", "number_of_employees": null, "founded_year": null, "score": 3.33040714263916, "source": "companies", "source_count": 52}, 
                      {"business_name": "T. MOBILE", "address": {"city": "BROOKLYN", "zip": 11209, "street": "86TH ST", "number": 440}, "score": 2.900916337966919, "source": "inspections", "source_count": 456}, 
                      {"business_name": "BOOST MOBILE", "address": {"city": "BRONX", "zip": 10458, "street": "E FORDHAM RD", "number": 261}, "score": 2.900916337966919, "source": "inspections", "source_count": 456}, 
                      {"business_name": "SPRING MOBILE", "address": {"city": "SOUTH RICHMOND HILL", "zip": 11419, "street": "LIBERTY AVE", "number": 12207}, "score": 2.900916337966919, "source": "inspections", "source_count": 456}
                    ], 
                    "totalCount": [
                      {"_id": "companies", "totalCount": 52}, 
                      {"_id": "inspections", "totalCount": 456}
                    ]
                  }
