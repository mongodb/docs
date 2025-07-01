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

   .. step:: Create a file named ``CompoundBuryQuery.java``.

   .. step:: Copy and paste the query into the ``CompoundBuryQuery.java`` file.

      .. tabs:: 
            
         .. tab:: Bury Documents in a Category 
            :tabid: bury-genre

            .. include:: /includes/fts/extracts/fts-compound-bury-category-stages.rst

            .. literalinclude:: /includes/fts/custom-score/bury-category-query.java
               :language: java
               :linenos:
               :dedent:
               :emphasize-lines: 39

         .. tab:: Bury Specified Documents 
            :tabid: bury-id

            .. include:: /includes/fts/extracts/fts-compound-bury-id-stages.rst

            .. literalinclude:: /includes/fts/custom-score/bury-documents-query.java
               :language: java
               :linenos:
               :dedent:
               :emphasize-lines: 43

   .. step:: Replace the ``<connection-string>`` in the query and then save the file.

      Ensure that your connection string includes your database user's
      credentials. To learn more, see :ref:`connect-via-driver`. 

   .. step:: Compile and run the ``CompoundBuryQuery.java`` file.
        
      .. tabs:: 
         :hidden:
            
         .. tab:: Bury Documents in a Category 
            :tabid: bury-genre

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: bash
        
                  javac CompoundBuryQuery.java

               .. output:: /includes/fts/custom-score/bury-category-java-results.json
                  :language: json

            .. include:: /includes/fts/extracts/fts-compound-bury-genre-results.rst 

         .. tab:: Bury Specified Documents 
            :tabid: bury-id

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: bash
        
                  javac CompoundBuryQuery.java

               .. output:: /includes/fts/custom-score/bury-documents-java-results.json
                  :language: json

            .. include:: /includes/fts/extracts/fts-compound-bury-id-results.rst 
