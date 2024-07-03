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

   .. step:: Create a file named ``AtlasVectorSearchTutorial.java``.

   .. step:: Copy and paste the code for the pre-filter operator you want to try into the ``AtlasVectorSearchTutorial.java`` file.
 
      .. include:: /includes/extracts/fts-vector-search-tutorial-queries-desc.rst 

      .. tabs:: 

         .. tab:: Pre-Filter by AND Operator 
            :tabid: and-operator

            .. include:: /includes/extracts/fts-vector-search-tutorial-simple-query-desc.rst

            .. literalinclude:: /includes/avs-examples/tutorial/filter-by-and-query.java  
               :language: java
               :linenos:
               :dedent:
               :emphasize-lines: 22


         .. tab:: Pre-Filter by OR and AND Operator 
            :tabid: or-and-operator

            .. include:: /includes/extracts/fts-vector-search-tutorial-advanced-query-desc.rst

            .. literalinclude:: /includes/avs-examples/tutorial/filter-by-or-and-query.java  
               :language: java
               :linenos:
               :dedent:
               :emphasize-lines: 21

      .. note:: 

         To run the sample code in your Maven environment, add the 
         following code above the import statements in your file.

         .. code-block:: 

            package com.mongodb.drivers;

   .. step:: Replace the ``<connection-string>`` with your |service| connection string and then save the file.

      Ensure that your connection string includes your database user's
      credentials. To learn more, see :ref:`connect-via-driver`. 

   .. step:: Compile and run ``AtlasVectorSearchTutorial.java`` file.

      .. tabs:: 
         :hidden:

         .. tab:: Pre-Filter by AND Operator 
            :tabid: and-operator

            .. io-code-block::
               :copyable: true 

               .. input:: 
                  :language: shell 

                  javac AtlasVectorSearchTutorial.java
                  java AtlasVectorSearchTutorial

               .. output:: /includes/avs-examples/tutorial/filter-by-and-query-java-output.js
                  :language: json 
                  :linenos:
                  :visible: true

         .. tab:: Pre-Filter by OR and AND Operator 
            :tabid: or-and-operator

            .. io-code-block::
               :copyable: true 

               .. input:: 
                  :language: shell 

                  javac AtlasVectorSearchTutorial.java
                  java AtlasVectorSearchTutorial

               .. output:: /includes/avs-examples/tutorial/filter-by-or-and-query-java-output.js
                  :language: json 
                  :linenos:
                  :visible: true
