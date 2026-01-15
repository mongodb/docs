.. procedure:: 
   :style: normal 

   .. step:: Save the following embeddings in a file named ``query-embeddings.js``.

      .. literalinclude:: /includes/avs/pipeline-stage/examples/enn-query-embeddings.js
         :language: javascript
         :copyable: true

   .. step:: Load the file into {+mongosh+} to use the embeddings in your query.
    
      .. code-block:: javascript 
 
         load('/<path-to-file>/query-embeddings.js');

   .. step:: Run the query.

      .. io-code-block::
         :copyable: true 

         .. input:: /includes/avs/pipeline-stage/examples/enn-basic-query.sh
            :language: shell
            :linenos: 

         .. output:: /includes/avs/pipeline-stage/examples/enn-basic-query-shell-output.js 
            :language: js
            :linenos: 
            :visible: false