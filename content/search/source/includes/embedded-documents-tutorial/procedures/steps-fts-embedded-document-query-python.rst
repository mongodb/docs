Run ``$search`` Queries Against Embedded Document Fields 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. include:: /includes/embedded-documents-tutorial/facts/search-query-intro.rst

.. procedure:: 
   :style: normal

   .. step:: Create files named ``basic-embedded-documents-query.py``, ``complex-embedded-document-query.py``, and  ``advanced-embedded-documents-query.py``.

   .. step:: Copy and paste the code example into the respective file.

      To learn more about these queries, see :ref:`embedded-documents-tutorial-queries`.

      .. tabs:: 

         .. tab:: Nested Array 
            :tabid: basic 

            To learn more about this query, see :ref:`embedded-documents-tutorial-queries`.

            .. literalinclude:: /includes/embedded-documents-tutorial/code-snippets/python/basic-query.py
               :language: python
               :linenos:
               :dedent:
               :emphasize-lines: 4

            .. include:: /includes/shared/facts/fact-fts-driver-connection-string.rst

         .. tab:: Nested Array Within Object 
            :tabid: complex

            To learn more about this query, see :ref:`embedded-documents-tutorial-queries`.

            .. literalinclude:: /includes/embedded-documents-tutorial/code-snippets/python/complex-nested-array-query.py 
               :language: python
               :linenos:
               :dedent:
               :emphasize-lines: 4

         .. tab:: Nested Array Within Array 
            :tabid: advanced

            To learn more about this query, see :ref:`embedded-documents-tutorial-queries`.

            .. literalinclude:: /includes/embedded-documents-tutorial/code-snippets/python/nested-array-query.py 
               :language: python
               :linenos:
               :dedent:
               :emphasize-lines: 4

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
                        
                  python basic-embedded-documents-query.py

               .. output:: /includes/embedded-documents-tutorial/code-snippets/json/basic-py-query-results.js 
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
                        
                  python complex-embedded-documents-query.py

               .. output:: /includes/embedded-documents-tutorial/code-snippets/json/complex-py-query-results.js
                  :language: json 
                  :linenos:
                  :visible: true

         .. tab:: Nested Array Within Array 
            :tabid: advanced

            .. io-code-block::
               :copyable: true 

               .. input:: 
                  :language: shell
                        
                  python advanced-embedded-documents-query.py

               .. output:: /includes/embedded-documents-tutorial/code-snippets/json/nested-array-py-query-results.js
                  :language: json 
                  :linenos:
                  :visible: true

