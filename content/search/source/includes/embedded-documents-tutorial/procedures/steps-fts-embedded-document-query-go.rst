Run ``$search`` Queries Against Embedded Document Fields 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. include:: /includes/embedded-documents-tutorial/facts/search-query-intro.rst

.. procedure:: 
   :style: normal

   .. step:: Create files named ``basic-embedded-documents-search.go``, ``complex-embedded-documents-search.go``, and ``nested-embedded-documents-search.go``.

   .. step:: Copy and paste the code example for the queries into the respective files.

      To learn more about these queries, see :ref:`embedded-documents-tutorial-queries`.

      .. tabs:: 

         .. tab:: Nested Array 
            :tabid: basic 

            To learn more about this query, see :ref:`embedded-documents-tutorial-queries`.

            .. literalinclude:: /includes/embedded-documents-tutorial/code-snippets/go/basic-query.go 
               :language: go
               :linenos:
               :dedent:
               :emphasize-lines: 14

            .. include:: /includes/shared/facts/fact-fts-driver-connection-string.rst

         .. tab:: Nested Array Within Object 
            :tabid: complex

            To learn more about this query, see :ref:`embedded-documents-tutorial-queries`.

            .. literalinclude:: /includes/embedded-documents-tutorial/code-snippets/go/complex-nested-array-query.go 
               :language: go
               :linenos:
               :dedent:
               :emphasize-lines: 14

            .. include:: /includes/shared/facts/fact-fts-driver-connection-string.rst

         .. tab:: Nested Array Within Array 
            :tabid: advanced

            To learn more about this query, see :ref:`embedded-documents-tutorial-queries`.

            .. literalinclude:: /includes/embedded-documents-tutorial/code-snippets/go/nested-array-query.go 
               :language: go
               :linenos:
               :dedent:
               :emphasize-lines: 14

            .. include:: /includes/shared/facts/fact-fts-driver-connection-string.rst

   .. step:: Run the following command to query your collection: 

      .. tabs:: 
         :hidden:

         .. tab:: Nested Array 
            :tabid: basic

            .. io-code-block::
               :copyable: true 

               .. input:: 
                  :language: shell

                  go run basic-embedded-documents-search.go

               .. output:: /includes/embedded-documents-tutorial/code-snippets/shell/basic-go-query-results.sh 
                  :language: json 
                  :linenos:
                  :visible: true

            .. include:: /includes/embedded-documents-tutorial/facts/fts-embedded-document-basic-query-results.rst

         .. tab:: Nested Array Within Object 
            :tabid: complex

            .. io-code-block::
               :copyable: true 

               .. input:: 
                  :language: shell

                  go run complex-embedded-documents-search.go 

               .. output:: /includes/embedded-documents-tutorial/code-snippets/shell/complex-go-query-results.sh 
                  :language: json 
                  :linenos:
                  :visible: true

            .. include:: /includes/embedded-documents-tutorial/facts/fts-embedded-document-complex-query-results.rst

         .. tab:: Nested Array Within Array 
            :tabid: advanced

            .. io-code-block::
               :copyable: true 

               .. input:: 
                  :language: shell

                  go run nested-embedded-documents-search.go

               .. output:: /includes/embedded-documents-tutorial/code-snippets/shell/nested-array-go-query-results.sh 
                  :language: json 
                  :linenos:
                  :visible: true

            .. include:: /includes/embedded-documents-tutorial/facts/fts-embedded-document-advanced-query-results.rst
