.. procedure:: 
   :style: normal

   .. step:: Create files named ``basic-embedded-documents-query.js``, ``complex-embedded-documents-query.js``, and ``nested-embedded-documents-query.js``.

   .. step:: Copy and paste the code for the query into the respective file.
 
      To learn more about these queries, see :ref:`embedded-documents-tutorial-queries`. 

      .. tabs:: 

         .. tab:: Nested Array 
            :tabid: basic 

            To learn more about this query, see :ref:`embedded-documents-tutorial-queries`.

            .. literalinclude:: /includes/fts/embedded-document/basic-query.js
               :language: javascript
               :linenos:
               :dedent:
               :emphasize-lines: 4

            .. include:: /includes/fts/facts/fact-fts-driver-connection-string.rst

         .. tab:: Nested Array Within Object 
            :tabid: complex

            To learn more about this query, see :ref:`embedded-documents-tutorial-queries`. 

            .. literalinclude:: /includes/fts/embedded-document/complex-nested-array-nodejs-query.js 
               :language: javascript
               :linenos:
               :dedent:
               :emphasize-lines: 4

            .. include:: /includes/fts/facts/fact-fts-driver-connection-string.rst

         .. tab:: Nested Array Within Array 
            :tabid: advanced

            To learn more about this query, see :ref:`embedded-documents-tutorial-queries`.

            .. literalinclude:: /includes/fts/embedded-document/nested-array-query.js 
               :language: javascript
               :linenos:
               :dedent:
               :emphasize-lines: 4

            .. include:: /includes/fts/facts/fact-fts-driver-connection-string.rst

   .. step:: Run the following command to query your collection: 

      .. tabs:: 
         :hidden:

         .. tab:: Nested Array 
            :tabid: basic

            .. io-code-block::
               :copyable: true 

               .. input:: 
                  :language: shell
                        
                  node basic-embedded-documents-query.js

               .. output:: /includes/fts/embedded-document/basic-nodejs-query-results.json 
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
                        
                  node complex-embedded-documents-query.js

               .. output:: /includes/fts/embedded-document/complex-nodejs-query-results.js 
                  :language: javascript 
                  :linenos:
                  :visible: true

            .. include:: /includes/fts/extracts/fts-embedded-document-complex-query-results.rst

         .. tab:: Nested Array Within Array 
            :tabid: advanced

            .. io-code-block::
               :copyable: true 

               .. input:: 
                  :language: shell
                        
                  node nested-embedded-documents-query.js

               .. output:: /includes/fts/embedded-document/nested-array-nodejs-query-results.js 
                  :language: javascript 
                  :linenos:
                  :visible: true

            .. include:: /includes/fts/extracts/fts-embedded-document-advanced-query-results.rst
