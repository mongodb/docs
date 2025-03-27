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

   .. step:: Create files named ``BasicEmbeddedDocumentsSearch.java``, ``ComplexEmbeddedDocumentQuery.java``, and ``NestedEmbeddedDocumentsSearch.java``.

   .. step:: Copy and paste the code for the |fts| query into the respective file.
 
      To learn more about these queries, see :ref:`embedded-documents-tutorial-queries`. 

      .. tabs:: 

         .. tab:: Nested Array  
            :tabid: basic

            To learn more about this query, see :ref:`embedded-documents-tutorial-queries`.

            .. literalinclude:: /includes/fts/embedded-document/basic-query.java
               :language: java
               :linenos:
               :dedent:
               :emphasize-lines: 41

            .. include:: /includes/fts/facts/fact-fts-driver-connection-string.rst

         .. tab:: Nested Array Within Object 
            :tabid: complex

            To learn more about this query, see :ref:`embedded-documents-tutorial-queries`.

            .. literalinclude:: /includes/fts/embedded-document/complex-nested-array-java-query.java 
               :language: java
               :linenos:
               :dedent:
               :emphasize-lines: 16

            .. include:: /includes/fts/facts/fact-fts-driver-connection-string.rst

         .. tab:: Nested Array Within Array 
            :tabid: advanced

            To learn more about this query, see :ref:`embedded-documents-tutorial-queries`.

            .. literalinclude:: /includes/fts/embedded-document/nested-array-query.java 
               :language: java
               :linenos:
               :dedent:
               :emphasize-lines: 52

            .. include:: /includes/fts/facts/fact-fts-driver-connection-string.rst

   .. step:: Compile and run the Java file.

      .. tabs:: 
         :hidden: true

         .. tab:: Nested Array  
            :tabid: basic

            .. io-code-block::
               :copyable: true 

               .. input:: 
                  :language: shell 

                  javac BasicEmbeddedDocumentsSearch.java
                  java BasicEmbeddedDocumentsSearch

               .. output:: /includes/fts/embedded-document/basic-java-query-results.json
                  :language: json 
                  :linenos:
                  :visible: true

            .. include:: /includes/fts/extracts/fts-embedded-document-basic-query-results.rst

         .. tab:: Nested Array Within Object
            :tabid: complex

            .. io-code-block::
               :copyable: true 

               .. input:: 
                  :language: shell 

                  javac ComplexEmbeddedDocumentQuery.java
                  java ComplexEmbeddedDocumentQuery

               .. output:: /includes/fts/embedded-document/complex-java-query-results.json 
                  :language: json 
                  :linenos:
                  :visible: true

            .. include:: /includes/fts/extracts/fts-embedded-document-complex-query-results.rst

         .. tab:: Nested Array Within Array 
            :tabid: advanced 

            .. io-code-block::
               :copyable: true 

               .. input:: 
                  :language: shell 

                  javac NestedEmbeddedDocumentsSearch.java
                  java NestedEmbeddedDocumentsSearch

               .. output:: /includes/fts/embedded-document/nested-array-java-query-results.json 
                  :language: json 
                  :linenos:
                  :visible: true

            .. include:: /includes/fts/extracts/fts-embedded-document-advanced-query-results.rst
