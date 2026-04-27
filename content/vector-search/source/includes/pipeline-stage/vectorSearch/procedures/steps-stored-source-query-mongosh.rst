.. procedure:: 
   :style: normal 

   .. step:: Save the following embeddings in a file named ``query-embeddings.js``:

      .. literalinclude:: /includes/pipeline-stage/vectorSearch/code-snippets/nodejs/stored-source-query-embeddings.js 
         :language: javascript
         :copyable: true 
         :caption: query-embeddings.js

   .. step:: Load the file into {+mongosh+} to use the embeddings in your query:

      .. code-block:: javascript 

         load('/<path-to-file>/query-embeddings.js');

   .. step:: Run the query:

      .. io-code-block:: 
         :copyable: true 

         .. input:: /includes/pipeline-stage/vectorSearch/code-snippets/shell/stored-source-query.sh
            :language: json
            :linenos:

         .. output:: /includes/pipeline-stage/vectorSearch/code-snippets/output/stored-source-query-shell-output.js 
            :language: javascript
            :linenos: 
            :visible: false
