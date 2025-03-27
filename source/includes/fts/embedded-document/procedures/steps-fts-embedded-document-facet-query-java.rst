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

   .. step:: Create files named ``FacetEmbeddedDocumentsSearch.java``.

   .. step:: Copy and paste the code for the |fts| query into the ``FacetEmbeddedDocumentsSearch.java`` file.
 
      .. include:: /includes/fts/extracts/fts-embedded-document-facet-query-intro.rst

      .. literalinclude:: /includes/fts/embedded-document/facet-query.java 
         :language: java
         :linenos:
         :dedent:
         :emphasize-lines: 11

      .. note:: 

         To run the sample code in your Maven environment, add the 
         following code above the import statements in your file.

         .. code-block:: 

            package com.mongodb.drivers;

   .. step:: Replace the ``<connection-string>`` in the query and then save the file.

      Ensure that your connection string includes your database user's
      credentials. To learn more, see :ref:`connect-via-driver`. 

   .. step:: Compile and run the Java file.

      .. io-code-block::
         :copyable: true 

         .. input:: 
            :language: shell 

            javac FacetEmbeddedDocumentsSearch.java
            java FacetEmbeddedDocumentsSearch

         .. output:: /includes/fts/embedded-document/facet-java-query-results.json
            :language: json 
            :linenos:
            :visible: true

      .. include:: /includes/fts/extracts/fts-embedded-document-facet-query-results.rst
