.. step:: Run a query on the ``embeddingsIndex`` partial index.

   a. Save the following embeddings in a file named ``query-embeddings.js``:

      .. literalinclude:: /includes/views/code-snippets/query-embeddings.js
         :language: javascript
         :copyable: true 

      This file contains the embeddings for the query term ``time travel``.

   #. In {+mongosh+}, load the file into {+mongosh+} to use the embeddings in your query:
   
      .. code-block:: javascript 

         load('/<path-to-file>/query-embeddings.js');

   #. Run the following query:

      .. io-code-block::
         :copyable: true 
         
         .. input:: /includes/views/code-snippets/mongosh-vector-query.json
            :language: sh
            :linenos:

         .. output:: /includes/views/output/mongosh-vector-query.js
            :language: sh
            :visible: false